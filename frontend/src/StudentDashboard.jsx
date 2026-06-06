import React, { useState, useEffect } from 'react';

export default function StudentDashboard() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const mockReapId = 'REAP-10294';

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${mockReapId}`);
      if (response.ok) {
        const data = await response.json();
        setStudentData(data);
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><p>Loading...</p></div>;
  }

  const status = studentData?.applicationStatus || {};
  const choices = studentData?.choices || [];
  const topChoices = choices.sort((a, b) => a.preference - b.preference).slice(0, 5);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen">
      
{/*  Enhanced Top Bar + Header Shell  */}
<div className={`fixed top-0 right-0 z-50 transition-all duration-300 ${isSidebarExpanded ? 'md:w-[calc(100%-16rem)]' : 'md:w-[calc(100%-5rem)]'} w-full`}>
{/*  Top Utility Bar  */}
<div className="bg-primary-container text-on-primary-container h-8 flex items-center justify-between px-gutter text-[11px] font-label-caps tracking-wider border-b border-white/5">
<div className="flex items-center gap-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[14px]" data-icon="mail">mail</span>
<span>support.reap2024@rajasthan.gov.in</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[14px]" data-icon="call">call</span>
<span>+91 141 2715081</span>
</div>
</div>
<div className="flex items-center gap-4">
<a className="hover:text-secondary-fixed transition-colors" href="#">Social</a>
<span className="opacity-30">|</span>
<a className="hover:text-secondary-fixed transition-colors" href="#">Notices</a>
<span className="opacity-30">|</span>
<a className="hover:text-secondary-fixed transition-colors" href="#">Hindi</a>
</div>
</div>
{/*  Main Header  */}
<header className="flex justify-between items-center px-gutter h-16 bg-primary dark:bg-primary-container shadow-md">
<div className="flex items-center gap-8">
<span className="font-h3 text-h3 font-semibold text-on-primary dark:text-on-primary-container tracking-tight">REAP 2024</span>
<nav className="hidden lg:flex gap-6 items-center">
<div className="group relative">
<button className="text-on-primary/90 font-button text-button flex items-center gap-1 py-2">
                        Admission Info
                        <span className="material-symbols-outlined text-[18px]" data-icon="expand_more">expand_more</span>
</button>
</div>
<div className="group relative">
<button className="text-on-primary/90 font-button text-button flex items-center gap-1 py-2">
                        Institutions
                        <span className="material-symbols-outlined text-[18px]" data-icon="expand_more">expand_more</span>
</button>
</div>
<a className="text-on-primary/90 font-button text-button hover:text-secondary-fixed transition-colors cursor-pointer" href="#">Schedule</a>
</nav>
</div>
<div className="flex items-center gap-6">
<nav className="hidden md:flex gap-6 items-center">
<a className="text-on-primary/80 font-body-sm text-body-sm hover:text-secondary-fixed transition-colors cursor-pointer" href="#">Contact Support</a>
<a className="text-on-primary/80 font-body-sm text-body-sm hover:text-secondary-fixed transition-colors cursor-pointer" href="#">Logout</a>
</nav>
</div>
</header>
</div>
{/*  Refined SideNavBar Shell  */}
<aside className={`fixed left-0 top-0 h-full bg-white border-r border-outline-variant flex flex-col py-6 hidden md:flex z-[60] transition-all duration-300 ${isSidebarExpanded ? 'w-64 items-start px-6' : 'w-20 items-center'}`}>
<button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className="absolute -right-3 top-6 w-6 h-6 bg-white border border-outline-variant rounded-full flex items-center justify-center shadow-sm hover:bg-surface-container transition-colors z-[70] group">
<span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary transition-transform duration-300" data-icon={isSidebarExpanded ? "chevron_left" : "chevron_right"}>
  {isSidebarExpanded ? "chevron_left" : "chevron_right"}
</span>
</button>
<div className="mb-8 flex flex-col w-full">
<div className={`flex items-center mb-8 ${isSidebarExpanded ? '' : 'justify-center'}`}>
<span className="material-symbols-outlined text-primary text-[32px]" data-icon="add_box">add_box</span>
{isSidebarExpanded && <span className="ml-3 font-button text-button text-primary">New Request</span>}
</div>
<div className={`h-12 bg-surface-container rounded-xl flex items-center cursor-pointer hover:bg-surface-dim transition-colors mb-8 ${isSidebarExpanded ? 'w-full px-4 justify-start' : 'w-12 justify-center mx-auto'}`}>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="search">search</span>
{isSidebarExpanded && <span className="ml-3 font-body-sm text-on-surface-variant">Search...</span>}
</div>
<p className={`font-label-caps text-[10px] text-outline mb-4 uppercase tracking-tighter ${isSidebarExpanded ? '' : 'text-center'}`}>Main</p>
<nav className="flex flex-col gap-4 w-full">
<a className={`h-14 bg-secondary-fixed text-on-secondary-fixed rounded-2xl flex items-center transition-all shadow-sm ${isSidebarExpanded ? 'w-full px-4' : 'w-14 justify-center mx-auto'}`} href="/student-dashboard">
<span className="material-symbols-outlined text-[28px]" data-icon="grid_view" style={{ fontVariationSettings: '\'FILL\' 1' }}>grid_view</span>
{isSidebarExpanded && <span className="ml-4 font-button text-button">Dashboard</span>}
</a>
<a className={`h-14 text-on-surface-variant hover:bg-surface-container-low rounded-2xl flex items-center transition-all group ${isSidebarExpanded ? 'w-full px-4' : 'w-14 justify-center mx-auto'}`} href="/student-information">
<span className="material-symbols-outlined text-[28px]" data-icon="fact_check">fact_check</span>
{isSidebarExpanded && <span className="ml-4 font-button text-button">Student Info</span>}
</a>
<a className={`h-14 text-on-surface-variant hover:bg-surface-container-low rounded-2xl flex items-center transition-all group ${isSidebarExpanded ? 'w-full px-4' : 'w-14 justify-center mx-auto'}`} href="#">
<span className="material-symbols-outlined text-[28px]" data-icon="account_balance_wallet">account_balance_wallet</span>
{isSidebarExpanded && <span className="ml-4 font-button text-button">Payments</span>}
</a>
<a className={`h-14 text-on-surface-variant hover:bg-surface-container-low rounded-2xl flex items-center transition-all group ${isSidebarExpanded ? 'w-full px-4' : 'w-14 justify-center mx-auto'}`} href="/choice-filling">
<span className="material-symbols-outlined text-[28px]" data-icon="format_list_numbered">format_list_numbered</span>
{isSidebarExpanded && <span className="ml-4 font-button text-button flex-grow">Choice Filling</span>}
</a>
</nav>
<div className={`h-px bg-outline-variant my-6 ${isSidebarExpanded ? 'w-full' : 'w-8 mx-auto'}`}></div>
</div>
<div className={`mt-auto mb-6 flex items-center ${isSidebarExpanded ? 'w-full' : 'justify-center mx-auto'}`}>
<div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-outline-variant hover:border-primary transition-all cursor-pointer shrink-0">
<img alt="User Profile Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/ADBb0ujxiUnsVPsHVRgQrFNmW5evWQ0kqCm1uchvJbZi-QW_ovX_3kG4Dyu6WSOk9ePoqneKijtKeH-Tp0W3be9fiJVKXBGdhJnevQ_KLssALsiN3T50bVRy95Z-056nSc0gzUxNjFPq4YS-wBGxgj3cEgA8V_EL-H17-Ce2hQYQvetyIjtPv3HaE1qQoKNKtwW20O5Z4xW44iADXM2SoQcXRnzQjEUjvr0fvQlkMFIpcH6FhlsBExSMuCwL5Ejzl9MskcfAhwOewsaLZhw"/>
</div>
{isSidebarExpanded && (
  <div className="ml-3 flex flex-col overflow-hidden">
    <span className="font-button text-button text-on-surface truncate w-32">{studentData?.fullName || 'Student'}</span>
    <span className="font-body-sm text-[11px] text-on-surface-variant truncate">{mockReapId}</span>
  </div>
)}
</div>
</aside>
{/*  Main Content Canvas  */}
<main className={`mt-[96px] p-gutter min-h-[calc(100vh-96px)] transition-all duration-300 ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
<div className="max-w-container-max mx-auto">
{/*  Header Section  */}
<section className="mb-10">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h1 className="font-h1 text-h1 text-primary">Welcome, {studentData?.fullName || 'Student'}</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-2">REAP ID: {mockReapId} {studentData?.meritRank ? `| Merit Rank: ${studentData.meritRank}` : ''}</p>
</div>
<div className="flex gap-4">
<button className="px-6 py-3 border border-primary text-primary font-button text-button rounded-lg hover:bg-surface-container transition-all" onClick={() => window.location.href='/student-information'}>
                        View Profile
                    </button>
<button className="px-6 py-3 bg-secondary text-on-secondary font-button text-button rounded-lg hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-sm" onClick={() => window.location.href='/choice-filling'}>
                        Modify Choice Filling
                    </button>
</div>
</div>
</section>
{/*  Bento Grid Dashboard  */}
<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
{/*  Application Status Card  */}
<div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant p-8 rounded-lg flex flex-col justify-between shadow-sm relative overflow-hidden">
<div className="relative z-10">
<div className="flex items-center justify-between mb-6">
<h3 className="font-h3 text-h3 text-primary">Application Status</h3>
<span className="px-4 py-1.5 bg-secondary-fixed text-on-secondary-fixed font-button text-button rounded-full">
                            {status.lockedChoices ? 'Choices Locked' : (choices.length > 0 ? 'Choices Saved - Not Locked' : 'Pending Action')}
                        </span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
<div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
<p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">Registration</p>
<div className="flex items-center gap-2 text-primary font-semibold">
<span className="material-symbols-outlined text-green-600" data-icon="check_circle" style={{ fontVariationSettings: '\'FILL\' 1' }}>check_circle</span>
                                {status.registrationStatus || 'Pending'}
                            </div>
</div>
<div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
<p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">Document Verification</p>
<div className="flex items-center gap-2 text-primary font-semibold">
{status.documentVerification === 'Completed' || status.documentVerification === 'Verified' ? 
  <span className="material-symbols-outlined text-green-600" data-icon="check_circle" style={{ fontVariationSettings: '\'FILL\' 1' }}>check_circle</span> : 
  <span className="material-symbols-outlined text-secondary" data-icon="pending">pending</span>
}
                                {status.documentVerification || 'Pending'}
                            </div>
</div>
<div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
<p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">Choice Filling</p>
<div className="flex items-center gap-2 text-primary font-semibold">
{status.choiceFilling === 'Completed' ? 
  <span className="material-symbols-outlined text-green-600" data-icon="check_circle" style={{ fontVariationSettings: '\'FILL\' 1' }}>check_circle</span> : 
  <span className="material-symbols-outlined text-secondary" data-icon="pending">pending</span>
}
                                {status.choiceFilling || 'Pending'}
                            </div>
</div>
</div>
</div>
<div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
<span className="material-symbols-outlined text-[200px]" data-icon="school">school</span>
</div>
</div>
{/*  Deadline/Dates Card  */}
<div className="md:col-span-4 bg-primary text-on-primary p-8 rounded-lg shadow-sm flex flex-col">
<h3 className="font-h3 text-h3 mb-6 flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="event">event</span>
                    Deadlines
                </h3>
<div className="space-y-6">
<div className="border-l-4 border-secondary-fixed pl-4">
<p className="font-label-caps text-label-caps text-on-primary-container uppercase">Choice Filling Closes</p>
<p className="font-body-lg font-bold">15 August, 2024</p>
<p className="font-body-sm text-on-primary/60">23:59 IST</p>
</div>
<div className="border-l-4 border-outline pl-4">
<p className="font-label-caps text-label-caps text-on-primary-container uppercase">Round 1 Allotment</p>
<p className="font-body-lg font-bold">22 August, 2024</p>
<p className="font-body-sm text-on-primary/60">Tentative</p>
</div>
<div className="border-l-4 border-outline pl-4">
<p className="font-label-caps text-label-caps text-on-primary-container uppercase">Reporting to College</p>
<p className="font-body-lg font-bold">25 - 28 August, 2024</p>
</div>
</div>
<button className="mt-auto w-full py-3 bg-secondary-fixed text-on-secondary-fixed font-button text-button rounded-lg hover:bg-secondary-fixed-dim transition-all mt-8">
                    View Schedule
                </button>
</div>
{/*  Top College Choices Section  */}
<div className="md:col-span-12 lg:col-span-7 bg-surface-container-lowest border border-outline-variant p-0 rounded-lg shadow-sm overflow-hidden">
<div className="p-6 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
<h3 className="font-h3 text-h3 text-primary">Priority Choices {topChoices.length > 0 ? `(Top ${topChoices.length})` : ''}</h3>
<a className="text-primary font-button text-button hover:underline" href="/choice-filling">Edit Choices</a>
</div>
<table className="w-full text-left border-collapse">
<thead className="bg-primary text-on-primary">
<tr>
<th className="px-6 py-3 font-label-caps text-label-caps uppercase text-[11px]">Pref</th>
<th className="px-6 py-3 font-label-caps text-label-caps uppercase text-[11px]">Institution Name</th>
<th className="px-6 py-3 font-label-caps text-label-caps uppercase text-[11px]">Branch</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
{topChoices.length > 0 ? topChoices.map((choice, index) => (
  <tr key={choice.id || index} className="hover:bg-surface-container-low transition-colors">
  <td className="px-6 py-4 font-bold text-primary">{choice.preference < 10 ? `0${choice.preference}` : choice.preference}</td>
  <td className="px-6 py-4">{choice.institution}</td>
  <td className="px-6 py-4">{choice.branch}</td>
  </tr>
)) : (
  <tr>
  <td colSpan="3" className="px-6 py-8 text-center text-on-surface-variant italic">No choices filled yet.</td>
  </tr>
)}
</tbody>
</table>
</div>
{/*  Featured Campus Card  */}
<div className="md:col-span-12 lg:col-span-5 relative group rounded-lg overflow-hidden border border-outline-variant shadow-sm h-full min-h-[300px]">
<img alt="Featured Institution" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida/ADBb0ujw4GJlhv3VvICRlrzn0ydRanxkfc5LeRv6GL99iJdEwyxb89UcMfB4PzwkAcrKdUUDjb6BeK_gnsBR_8-mKFunjlsn7XkZpf0a4sBEXhhdBm-6dIjnqyuIynqy3XD3ZzvyGay-V8P5dgqQtTqouNfGEIhkPUdV1gZhX0x9UW0QGr27iS9Dqden-H5jdgrL4sVBSSoucUDLRpSeSRmxsGppJIviuCvwdfIiui9RgeqhkhaqENkNCzi_gcENHzsMdKDClTGkAlzV4T8"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
<div className="absolute bottom-0 left-0 p-8 text-on-primary">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-secondary-fixed" data-icon="star" style={{ fontVariationSettings: '\'FILL\' 1' }}>star</span>
<p className="font-label-caps text-label-caps text-secondary-fixed uppercase tracking-widest text-[10px]">Featured Institution</p>
</div>
<h4 className="font-h3 text-h3 mb-2">Explore MBIT Jodhpur</h4>
<p className="font-body-sm text-on-primary/80 mb-4">View campus facilities, faculty profiles, and placement records for the 2023-24 batch.</p>
<button className="px-6 py-2 bg-on-primary text-primary font-button text-button rounded-lg hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all">
                        View Prospectus
                    </button>
</div>
</div>
</div>
</div>
</main>
    </div>
  );
}
