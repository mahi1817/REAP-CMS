import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Admin routes
app.get('/api/admin/students', async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        choices: true,
      }
    });
    // We should also fetch the application status, but it's not directly related to student in schema?
    // Wait, let's look at schema. ApplicationStatus has studentId.
    const statuses = await prisma.applicationStatus.findMany();
    
    const studentsWithStatus = students.map(student => {
      const status = statuses.find(s => s.studentId === student.id);
      return { ...student, applicationStatus: status };
    });

    res.json(studentsWithStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Student routes
app.get('/api/students/:reapId', async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { reapId: req.params.reapId },
      include: { choices: true }
    });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    
    const status = await prisma.applicationStatus.findUnique({
      where: { studentId: student.id }
    });

    res.json({ ...student, applicationStatus: status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/students', async (req, res) => {
  try {
    const student = await prisma.student.create({
      data: req.body
    });
    
    // Create initial ApplicationStatus
    const status = await prisma.applicationStatus.create({
      data: {
        studentId: student.id,
        registrationStatus: "Verified",
        documentVerification: "Pending",
        choiceFilling: "Pending",
        lockedChoices: false
      }
    });

    res.status(201).json({ ...student, applicationStatus: status });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update student info
app.put('/api/students/:reapId', async (req, res) => {
  try {
    const student = await prisma.student.update({
      where: { reapId: req.params.reapId },
      data: req.body
    });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Choice routes
app.post('/api/choices/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const { choices, isLocked } = req.body; // choices is an array of { preference, institution, branch }

    // First delete existing choices
    await prisma.choice.deleteMany({
      where: { studentId }
    });

    // Create new choices
    if (choices && choices.length > 0) {
      const choicesData = choices.map(c => ({
        ...c,
        studentId
      }));
      await prisma.choice.createMany({
        data: choicesData
      });
    }

    // Update status
    await prisma.applicationStatus.update({
      where: { studentId },
      data: { 
        choiceFilling: isLocked ? "Completed" : "In Progress",
        lockedChoices: isLocked || false
      }
    });

    res.status(200).json({ message: 'Choices saved successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
