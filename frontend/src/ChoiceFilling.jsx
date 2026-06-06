import React, { useState, useEffect } from 'react';

export default function ChoiceFilling() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [choices, setChoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');

  // form state for new choice
  const [newInstitution, setNewInstitution] = useState('');
  const [newBranch, setNewBranch] = useState('');

  const mockReapId = 'REAP-10294';

  const INSTITUTIONS = [
    "MBM Engineering College, Jodhpur",
    "CTAE, Udaipur",
    "Government Engineering College, Ajmer",
    "MNIT Jaipur",
    "RTU Kota"
  ];
  
  const BRANCHES = [
    "Computer Science & Engineering",
    "Electronics & Comm. Engineering",
    "Information Technology",
    "Mechanical Engineering"
  ];

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${mockReapId}`);
      if (response.ok) {
        const data = await response.json();
        setStudentData(data);
        if (data.choices) {
          // Sort choices by preference
          const sorted = data.choices.sort((a, b) => a.preference - b.preference);
          setChoices(sorted);
        }
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddChoice = () => {
    if (!newInstitution || !newBranch) return;
    const newChoice = {
      preference: choices.length + 1,
      institution: newInstitution,
      branch: newBranch
    };
    setChoices([...choices, newChoice]);
    setNewInstitution('');
    setNewBranch('');
  };

  const handleRemoveChoice = (indexToRemove) => {
    const updated = choices.filter((_, index) => index !== indexToRemove);
    // re-assign preferences
    const reordered = updated.map((c, idx) => ({ ...c, preference: idx + 1 }));
    setChoices(reordered);
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...choices];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    
    // re-assign preferences
    const reordered = updated.map((c, idx) => ({ ...c, preference: idx + 1 }));
    setChoices(reordered);
  };

  const handleMoveDown = (index) => {
    if (index === choices.length - 1) return;
    const updated = [...choices];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    
    // re-assign preferences
    const reordered = updated.map((c, idx) => ({ ...c, preference: idx + 1 }));
    setChoices(reordered);
  };

  const handleSave = async (isLocked = false) => {
    if (!studentData) return;
    setMessage('');
    try {
      const response = await fetch(`http://localhost:5000/api/choices/${studentData.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ choices, isLocked })
      });
      if (response.ok) {
        setMessage(isLocked ? 'Choices locked successfully!' : 'Choices saved successfully!');
        if (isLocked) {
           // refresh status
           fetchStudentData();
        }
      } else {
        const err = await response.json();
        setMessage(`Error: ${err.error}`);
      }
    } catch (error) {
      setMessage('Network error occurred.');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><p>Loading...</p></div>;
  }

  const isLocked = studentData?.applicationStatus?.lockedChoices || false;

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen">
      
{/*  Utility Bar  */}
<div className="fixed top-0 left-0 w-full z-[60] bg-primary text-on-primary h-8 flex items-center justify-between px-gutter text-[11px] font-label-caps tracking-wider border-b border-white/10">
<div className="flex items-center gap-6">
<a className="flex items-center gap-1.5 hover:text-secondary-fixed transition-colors" href="mailto:support@reap2024.org">
<span className="material-symbols-outlined text-[14px]">mail</span>
            support@reap2024.org
        </a>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[14px]">call</span>
            +91 141 2715082
        </div>
</div>
</div>
{/*  Main Top Header  */}
<header className="fixed top-8 left-0 w-full z-50 flex justify-between items-center px-gutter h-16 bg-surface-container-lowest dark:bg-primary-container border-b border-outline-variant shadow-sm">
<div className="flex items-center gap-8">
<div className="flex items-center gap-3">
<div className="bg-primary p-1.5 rounded">
<span className="material-symbols-outlined text-on-primary text-2xl">school</span>
</div>
<span className="font-h3 text-h3 font-bold text-primary dark:text-on-primary-container leading-none">REAP <span className="text-secondary">2024</span></span>
</div>
<nav className="hidden lg:flex items-center gap-1">
<a className="px-3 py-5 font-button text-button text-on-surface-variant hover:text-primary" href="/student-dashboard">DASHBOARD</a>
<a className="px-3 py-5 font-button text-button text-on-surface-variant hover:text-primary" href="/student-information">PROFILE</a>
</nav>
</div>
<div className="flex items-center gap-4">
<div className="flex flex-col items-end mr-2">
<span className="font-button text-[12px] text-primary">{studentData?.fullName || 'Student'}</span>
<span className="text-[10px] text-on-surface-variant font-label-caps">ID: {mockReapId}</span>
</div>
<div className="relative group cursor-pointer">
<img alt="User Profile" className="w-10 h-10 rounded-full border-2 border-primary/10 group-hover:border-primary transition-all object-cover" src="https://lh3.googleusercontent.com/aida/ADBb0ujxiUnsVPsHVRgQrFNmW5evWQ0kqCm1uchvJbZi-QW_ovX_3kG4Dyu6WSOk9ePoqneKijtKeH-Tp0W3be9fiJVKXBGdhJnevQ_KLssALsiN3T50bVRy95Z-056nSc0gzUxNjFPq4YS-wBGxgj3cEgA8V_EL-H17-Ce2hQYQvetyIjtPv3HaE1qQoKNKtwW20O5Z4xW44iADXM2SoQcXRnzQjEUjvr0fvQlkMFIpcH6FhlsBExSMuCwL5Ejzl9MskcfAhwOewsaLZhw"/>
<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
</div>
</div>
</header>
{/*  SideNavBar  */}
<aside className={`fixed left-0 top-24 h-[calc(100vh-96px)] bg-surface-container-lowest dark:bg-surface-container-low border-r border-outline-variant flex flex-col pt-4 pb-6 z-40 transition-all duration-300 ${isSidebarExpanded ? 'w-64 px-4 items-start' : 'w-20 items-center'}`}>
<button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className="absolute -right-3 top-4 w-6 h-6 bg-surface-container-lowest border border-outline-variant rounded-full flex items-center justify-center shadow-sm hover:bg-surface-container hover:border-primary/30 transition-all z-50 group">
<span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary transition-transform duration-300" data-icon={isSidebarExpanded ? "chevron_left" : "chevron_right"}>
  {isSidebarExpanded ? "chevron_left" : "chevron_right"}
</span>
</button>
<div className="flex flex-col gap-6 w-full mt-4">
{/*  Main Section  */}
<div className="w-full flex flex-col gap-2">
<span className={`text-[10px] font-bold text-on-surface-variant/50 tracking-tighter uppercase mb-1 ${isSidebarExpanded ? 'text-left' : 'text-center'}`}>Main</span>
<a className={`h-12 flex items-center rounded-2xl text-on-surface-variant hover:bg-surface-container-high transition-all group ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3' : 'w-12 justify-center'}`} href="/student-dashboard">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">dashboard</span>
{isSidebarExpanded && <span className="font-button text-sm">Dashboard</span>}
</a>
<a className={`h-12 flex items-center rounded-2xl bg-primary text-on-primary shadow-lg shadow-primary/20 transition-all ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3' : 'w-12 justify-center'}`} href="/choice-filling">
<span className="material-symbols-outlined">edit_square</span>
{isSidebarExpanded && <span className="font-button text-sm">Choice Filling</span>}
</a>
<a className={`h-12 flex items-center rounded-2xl text-on-surface-variant hover:bg-surface-container-high transition-all group ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3' : 'w-12 justify-center'}`} href="/student-information">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">verified_user</span>
{isSidebarExpanded && <span className="font-button text-sm">Student Info</span>}
</a>
</div>
</div>
</aside>
{/*  Main Content Canvas  */}
<main className={`mt-24 p-gutter min-h-screen transition-all duration-300 ${isSidebarExpanded ? 'ml-64' : 'ml-20'}`}>
<div className="max-w-container-max mx-auto space-y-8 pb-12">

{message && (
  <div className={`p-4 rounded-xl border ${message.includes('Error') ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'}`}>
    {message}
  </div>
)}

{/*  Choice Filling Workspace  */}
<div className="grid grid-cols-12 gap-gutter">
{/*  Left Sidebar: Filter and Add Choices  */}
<aside className="col-span-12 md:col-span-4 space-y-6">
<div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-sm relative">
{isLocked && <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center rounded-2xl"><span className="bg-white px-4 py-2 rounded-lg shadow font-bold text-error">Choices Locked</span></div>}
<h3 className="font-h3 text-h3 text-primary mb-6 flex items-center gap-2">
<span className="material-symbols-outlined">add_circle</span>
                        Add New Choice
                    </h3>
<div className="space-y-5">
<div>
<label className="font-label-caps text-[11px] text-on-surface-variant block mb-2 uppercase tracking-wider">Institution</label>
<select className="w-full border border-outline-variant rounded-xl p-3.5 focus:ring-2 focus:ring-primary focus:outline-none bg-surface-bright text-body-md" value={newInstitution} onChange={e => setNewInstitution(e.target.value)}>
<option value="">-- Select Institution --</option>
{INSTITUTIONS.map((inst, i) => <option key={i} value={inst}>{inst}</option>)}
</select>
</div>
<div>
<label className="font-label-caps text-[11px] text-on-surface-variant block mb-2 uppercase tracking-wider">Branch / Discipline</label>
<select className="w-full border border-outline-variant rounded-xl p-3.5 focus:ring-2 focus:ring-primary focus:outline-none bg-surface-bright text-body-md" value={newBranch} onChange={e => setNewBranch(e.target.value)}>
<option value="">-- Select Branch --</option>
{BRANCHES.map((br, i) => <option key={i} value={br}>{br}</option>)}
</select>
</div>
<button onClick={handleAddChoice} disabled={!newInstitution || !newBranch || isLocked} className="w-full bg-primary text-on-primary py-4 font-button text-button rounded-xl hover:bg-primary-container transition-all active:scale-[0.98] shadow-lg shadow-primary/10 mt-2 disabled:opacity-50">
                            Add Choice
                        </button>
</div>
</div>
{/*  Informational Card  */}
<div className="bg-primary text-on-primary rounded-2xl p-7 shadow-xl relative overflow-hidden group">
<div className="relative z-10">
<h4 className="font-h3 text-h3 mb-4">Instructions</h4>
<ul className="space-y-4 font-body-sm text-body-sm">
<li className="flex gap-3 items-start">
<span className="material-symbols-outlined text-secondary text-lg mt-0.5">info</span>
<span className="opacity-90">You can add as many choices as you want to increase chances.</span>
</li>
<li className="flex gap-3 items-start">
<span className="material-symbols-outlined text-secondary text-lg mt-0.5">info</span>
<span className="opacity-90">Choices can be modified until the final lock date.</span>
</li>
<li className="flex gap-3 items-start">
<span className="material-symbols-outlined text-secondary text-lg mt-0.5">info</span>
<span className="opacity-90">Prioritize your top choices at the higher ranks carefully.</span>
</li>
</ul>
</div>
<div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
<span className="material-symbols-outlined text-[140px]">school</span>
</div>
</div>
</aside>
{/*  Right Content: Selected Choices List  */}
<section className="col-span-12 md:col-span-8 space-y-4">
<div className="flex items-center justify-between mb-4 px-2">
<div>
<h3 className="font-h3 text-h3 text-primary mb-1">Priority List</h3>
<p className="text-body-sm text-on-surface-variant">Arrange your choices in order of preference.</p>
</div>
<div className="flex items-center gap-6">
<div className="bg-primary/5 px-4 py-2 rounded-full">
<span className="text-body-sm font-semibold text-primary">{choices.length} Choices Selected</span>
</div>
<button onClick={() => !isLocked && setChoices([])} disabled={isLocked} className="text-error font-button text-button flex items-center gap-1.5 hover:bg-error-container/20 px-3 py-2 rounded-lg transition-colors disabled:opacity-50">
<span className="material-symbols-outlined text-sm">delete_sweep</span> Clear All
                        </button>
</div>
</div>

{choices.map((choice, index) => (
<div key={index} className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 flex items-center gap-5 hover:shadow-lg hover:border-primary/20 transition-all group">
<div className="bg-surface-container-high text-on-surface-variant w-12 h-12 flex items-center justify-center rounded-xl font-bold text-h3 shrink-0">{choice.preference}</div>
<div className="flex-1">
<h4 className="font-body-lg text-body-lg text-primary font-bold">{choice.institution}</h4>
<div className="flex items-center gap-3 mt-1">
<p className="font-body-sm text-body-sm text-on-surface-variant">{choice.branch}</p>
</div>
</div>
{!isLocked && (
<div className="flex items-center gap-3">
<div className="flex flex-col gap-1.5">
<button onClick={() => handleMoveUp(index)} disabled={index === 0} className="p-2 hover:bg-surface-container-high rounded-lg text-primary transition-colors disabled:opacity-20 disabled:pointer-events-none">
<span className="material-symbols-outlined">expand_less</span>
</button>
<button onClick={() => handleMoveDown(index)} disabled={index === choices.length - 1} className="p-2 hover:bg-surface-container-high rounded-lg text-primary transition-colors disabled:opacity-20 disabled:pointer-events-none">
<span className="material-symbols-outlined">expand_more</span>
</button>
</div>
<button onClick={() => handleRemoveChoice(index)} className="p-3 text-on-surface-variant hover:text-error hover:bg-error-container rounded-xl transition-colors">
<span className="material-symbols-outlined">delete</span>
</button>
</div>
)}
</div>
))}

{choices.length === 0 && (
<div className="border-2 border-dashed border-outline-variant rounded-2xl p-16 flex flex-col items-center justify-center text-on-surface-variant bg-surface-container-low/20">
<p className="font-body-lg text-body-lg text-primary font-semibold mb-1">No Choices Added</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Use the form on the left to add institutions.</p>
</div>
)}

{/*  Submit Footer  */}
<div className="flex items-center justify-between pt-10 border-t border-outline-variant mt-6">
<div className={`flex items-center gap-3 px-4 py-2 rounded-lg border ${isLocked ? 'bg-red-50 border-red-100' : 'bg-yellow-50 border-yellow-100'}`}>
<span className={`material-symbols-outlined ${isLocked ? 'text-red-600' : 'text-yellow-600'}`}>{isLocked ? 'lock' : 'lock_open'}</span>
<span className={`font-body-sm text-body-sm italic font-medium ${isLocked ? 'text-red-800' : 'text-yellow-800'}`}>
  {isLocked ? 'Choices are locked and cannot be modified.' : 'Choices are currently unlocked and modifiable.'}
</span>
</div>
<div className="flex gap-4">
<button onClick={() => handleSave(false)} disabled={isLocked || choices.length === 0} className="px-8 py-3.5 border border-primary text-primary font-button text-button rounded-xl hover:bg-primary/5 transition-colors disabled:opacity-50">
                            Save Progress
                        </button>
<button onClick={() => { if(window.confirm('Are you sure you want to lock choices? This cannot be undone.')) handleSave(true) }} disabled={isLocked || choices.length === 0} className="px-12 py-3.5 bg-secondary-container text-on-secondary-container font-button text-button rounded-xl shadow-lg shadow-secondary/20 hover:shadow-xl transition-all active:scale-95 border border-secondary font-bold text-md disabled:opacity-50">
                            Final Lock
                        </button>
</div>
</div>
</section>
</div>
</div>
</main>
    </div>
  );
}
