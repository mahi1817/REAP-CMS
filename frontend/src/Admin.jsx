import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/students');
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
        if (data.length > 0) {
          setSelectedStudent(data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><p>Loading Admin Data...</p></div>;
  }

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen flex flex-col">
      
{/*  Enhanced Header  */}
<header className="sticky top-0 z-50 bg-white border-b border-outline-variant shadow-sm w-full">
<div className="max-w-container-max mx-auto px-gutter h-20 flex items-center justify-between">
<div className="flex items-center gap-12">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary font-h3">R</div>
<span className="font-h3 text-[24px] font-semibold text-primary tracking-tight">REAP 2024 Admin</span>
</div>
<nav className="hidden lg:flex items-center gap-8">
<a className="text-on-surface font-button hover:text-primary transition-colors" href="#">DASHBOARD</a>
<a className="text-on-surface font-button hover:text-primary transition-colors text-primary font-bold" href="#">STUDENTS</a>
</nav>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex items-center gap-2 mr-4 text-on-surface-variant font-label-caps bg-surface-container px-3 py-1.5 rounded-full">
<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    SYSTEM LIVE
                </div>
</div>
</div>
</header>
<div className="flex min-h-screen flex-1">
{/*  Sidebar for Students List  */}
<aside className={`bg-white border-r border-outline-variant flex flex-col py-6 sticky top-0 h-[calc(100vh-80px)] z-40 transition-all duration-300 w-80 overflow-y-auto`}>
<div className="px-6 mb-4">
  <h3 className="font-h3 text-primary text-[18px] font-semibold mb-4">All Students</h3>
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-sm">search</span>
    <input className="w-full pl-9 pr-4 py-2 border border-outline rounded bg-white text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none" placeholder="Search by Name or ID..." type="text"/>
  </div>
</div>
<div className="flex flex-col gap-2 px-4">
  {students.map(student => (
    <button 
      key={student.id}
      onClick={() => handleStudentSelect(student)}
      className={`text-left p-3 rounded-lg border transition-all ${selectedStudent?.id === student.id ? 'bg-primary/5 border-primary shadow-sm' : 'bg-white border-outline-variant hover:border-primary/50 hover:bg-surface-container-low'}`}
    >
      <p className="font-body-md font-bold text-primary truncate">{student.fullName || 'Unknown Student'}</p>
      <p className="font-body-sm text-on-surface-variant text-[11px] mt-1">{student.reapId}</p>
      <div className="flex justify-between items-center mt-2">
        <span className={`text-[10px] px-2 py-0.5 rounded font-label-caps ${student.applicationStatus?.registrationStatus === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {student.applicationStatus?.registrationStatus || 'Pending'}
        </span>
        <span className="text-[10px] text-on-surface-variant font-bold">{student.choices?.length || 0} Choices</span>
      </div>
    </button>
  ))}
  {students.length === 0 && <p className="text-center text-on-surface-variant mt-8 text-sm">No students found.</p>}
</div>
</aside>

{/*  Main Content Area  */}
<main className="flex-1 bg-background pt-8 pb-section-padding px-gutter flex-grow overflow-y-auto h-[calc(100vh-80px)]">
{selectedStudent ? (
<>
{/*  Header Section  */}
<div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
<div>
<nav className="flex items-center gap-2 text-on-surface-variant font-label-caps text-label-caps mb-2">
<span className="text-primary font-bold">APPLICATION #{selectedStudent.reapId}</span>
</nav>
<h1 className="font-h2 text-h2 text-primary">{selectedStudent.fullName}</h1>
<p className="text-on-surface-variant font-body-md mt-1">
  {selectedStudent.jeePercentile ? `JEE Mains Score: ${selectedStudent.jeePercentile} Percentile | ` : ''} 
  Merit Rank: {selectedStudent.meritRank ? `#${selectedStudent.meritRank}` : 'Unassigned'}
</p>
</div>
<div className="flex gap-3">
<button className="px-6 py-3 border-2 border-primary text-primary font-button rounded transition-all hover:bg-surface-container-low active:scale-95">
                        Notify Student
                    </button>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
{/*  Left Panel: Personal and Academic Info  */}
<div className="lg:col-span-5 space-y-6">
{/*  Profile Summary Card  */}
<div className="bg-white border border-outline-variant rounded-lg overflow-hidden shadow-sm">
<div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant">
<h3 className="font-h3 text-primary text-[20px] font-semibold">Personal Profile</h3>
</div>
<div className="p-6 space-y-6">
<div className="flex items-start gap-4">
<div className="w-24 h-24 rounded border border-outline-variant bg-surface-variant flex-shrink-0">
<img alt="Student Photo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/ADBb0ujw4GJlhv3VvICRlrzn0ydRanxkfc5LeRv6GL99iJdEwyxb89UcMfB4PzwkAcrKdUUDjb6BeK_gnsBR_8-mKFunjlsn7XkZpf0a4sBEXhhdBm-6dIjnqyuIynqy3XD3ZzvyGay-V8P5dgqQtTqouNfGEIhkPUdV1gZhX0x9UW0QGr27iS9Dqden-H5jdgrL4sVBSSoucUDLRpSeSRmxsGppJIviuCvwdfIiui9RgeqhkhaqENkNCzi_gcENHzsMdKDClTGkAlzV4T8"/>
</div>
<div className="space-y-1">
<span className="block font-label-caps text-on-surface-variant">FULL NAME</span>
<span className="block font-body-lg text-on-surface font-semibold">{selectedStudent.fullName}</span>
<span className="block font-label-caps text-on-surface-variant mt-2">REAP ID</span>
<span className="block font-body-md text-on-surface">{selectedStudent.reapId}</span>
</div>
</div>
<div className="grid grid-cols-2 gap-y-6">
<div>
<span className="block font-label-caps text-on-surface-variant">CATEGORY</span>
<span className="block font-body-md text-on-surface">{selectedStudent.casteCategory || 'N/A'}</span>
</div>
<div>
<span className="block font-label-caps text-on-surface-variant">STATE DOMICILE</span>
<span className="block font-body-md text-on-surface">{selectedStudent.domicile || 'N/A'}</span>
</div>
<div>
<span className="block font-label-caps text-on-surface-variant">EX-SERVICEMAN</span>
<span className="block font-body-md text-on-surface">{selectedStudent.exServiceman ? 'Yes' : 'No'}</span>
</div>
</div>
</div>
</div>
{/*  Academic Credentials  */}
<div className="bg-white border border-outline-variant rounded-lg overflow-hidden shadow-sm">
<div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant flex justify-between items-center">
<h3 className="font-h3 text-primary text-[20px] font-semibold">Academic Merit</h3>
<span className="bg-primary text-on-primary px-3 py-1 rounded text-label-caps">
  {selectedStudent.applicationStatus?.documentVerification || 'PENDING'}
</span>
</div>
<div className="p-6">
<table className="w-full">
<thead className="border-b border-outline-variant text-label-caps text-on-surface-variant">
<tr>
<th className="text-left pb-2 font-bold">EXAMINATION</th>
<th className="text-right pb-2 font-bold">SCORE/PERCENT</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr>
<td className="py-3 font-body-md font-semibold">JEE Mains 2024</td>
<td className="py-3 text-right font-body-md">{selectedStudent.jeePercentile ? `${selectedStudent.jeePercentile}%ile` : 'N/A'}</td>
</tr>
<tr>
<td className="py-3 font-body-md">Class XII</td>
<td className="py-3 text-right font-body-md">{selectedStudent.class12Percentage ? `${selectedStudent.class12Percentage}%` : 'N/A'}</td>
</tr>
</tbody>
</table>
<div className="mt-6 bg-surface-container-highest p-4 rounded-lg flex items-start gap-3">
<span className="material-symbols-outlined text-primary">workspace_premium</span>
<div>
<p className="font-label-caps text-primary mb-1">CALCULATED REAP RANK</p>
<p className="font-h3 text-primary font-bold">{selectedStudent.meritRank ? `#${selectedStudent.meritRank}` : 'Pending'}</p>
</div>
</div>
</div>
</div>
</div>
{/*  Right Panel: Interactive Choice Filling List  */}
<div className="lg:col-span-7">
<div className="bg-white border border-outline-variant rounded-lg overflow-hidden shadow-sm h-full flex flex-col">
<div className="bg-primary px-6 py-4 flex justify-between items-center">
<h3 className="font-h3 text-on-primary text-[20px] font-semibold">Filled Choices</h3>
<span className={`px-3 py-1 rounded text-[10px] font-bold ${selectedStudent.applicationStatus?.lockedChoices ? 'bg-red-500 text-white' : 'bg-yellow-400 text-black'}`}>
  {selectedStudent.applicationStatus?.lockedChoices ? 'LOCKED' : 'UNLOCKED'}
</span>
</div>
<div className="flex-1 overflow-y-auto min-h-[400px]">
<div className="p-6 space-y-4">

{selectedStudent.choices && selectedStudent.choices.length > 0 ? 
  selectedStudent.choices.sort((a,b) => a.preference - b.preference).map(choice => (
  <div key={choice.id} className="group flex items-center gap-4 bg-white border border-outline-variant p-4 rounded-lg hover:border-primary-container transition-colors relative">
  <div className="flex flex-col items-center gap-1 text-on-surface-variant w-8">
  <span className="font-h3 text-primary/30 font-bold leading-none">{choice.preference < 10 ? `0${choice.preference}` : choice.preference}</span>
  </div>
  <div className="flex-1">
  <h4 className="font-body-lg font-bold text-primary">{choice.institution}</h4>
  <p className="text-on-surface-variant font-body-md">{choice.branch}</p>
  </div>
  </div>
)) : (
  <div className="flex items-center justify-center h-48 text-on-surface-variant italic">
    No choices filled by this student yet.
  </div>
)}

</div>
</div>
<div className="p-6 bg-surface-container border-t border-outline-variant">
<div className="flex items-center justify-between">
<span className="text-body-sm text-on-surface-variant">Last updated: {new Date(selectedStudent.updatedAt).toLocaleString()}</span>
</div>
</div>
</div>
</div>
</div>
</>
) : (
  <div className="flex h-full items-center justify-center text-on-surface-variant">
    <p>Select a student from the sidebar to view details.</p>
  </div>
)}
</main>
</div>
    </div>
  );
}
