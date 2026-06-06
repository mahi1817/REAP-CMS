import React, { useState, useEffect } from 'react';

export default function StudentInformation() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [studentData, setStudentData] = useState({
    fullName: '',
    casteCategory: '',
    jeePercentile: '',
    class12Percentage: '',
    domicile: '',
    exServiceman: 'No'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Use a mock REAP ID for demonstration
  const mockReapId = 'REAP-10294';

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/students/${mockReapId}`);
      if (response.ok) {
        const data = await response.json();
        setStudentData({
          fullName: data.fullName || '',
          casteCategory: data.casteCategory || '',
          jeePercentile: data.jeePercentile || '',
          class12Percentage: data.class12Percentage || '',
          domicile: data.domicile || '',
          exServiceman: data.exServiceman ? 'Yes' : 'No'
        });
      } else if (response.status === 404) {
        // Create mock student if not found
        await fetch('http://localhost:5000/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reapId: mockReapId, fullName: 'Rahul Sharma' })
        });
        setStudentData(prev => ({ ...prev, fullName: 'Rahul Sharma' }));
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    
    const payload = {
      ...studentData,
      jeePercentile: parseFloat(studentData.jeePercentile) || null,
      class12Percentage: parseFloat(studentData.class12Percentage) || null,
      exServiceman: studentData.exServiceman === 'Yes'
    };

    try {
      const response = await fetch(`http://localhost:5000/api/students/${mockReapId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        setMessage({ type: 'success', text: 'Information saved successfully!' });
      } else {
        const errData = await response.json();
        setMessage({ type: 'error', text: errData.error || 'Failed to save information' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error occurred' });
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><p>Loading...</p></div>;
  }

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen">
      
{/*  Top Utility Bar  */}
<div className="bg-primary text-on-primary py-2 px-gutter hidden md:flex justify-between items-center text-xs border-b border-white/10 relative z-[60]">
<div className="flex items-center gap-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]">mail</span>
<span>admissions2024@reap-edu.in</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px]">call</span>
<span>+91 141 2715082</span>
</div>
</div>
<div className="flex items-center gap-4">
<a className="hover:text-secondary-fixed transition-colors" href="#">Twitter</a>
<a className="hover:text-secondary-fixed transition-colors" href="#">LinkedIn</a>
<a className="hover:text-secondary-fixed transition-colors" href="#">Facebook</a>
<div className="h-3 w-px bg-white/20 mx-2"></div>
<button className="flex items-center gap-1 hover:text-secondary-fixed transition-colors">
<span>EN</span>
<span className="material-symbols-outlined text-[14px]">expand_more</span>
</button>
</div>
</div>
{/*  Enhanced Navigation Header  */}
<header className="sticky top-0 left-0 w-full z-50 flex justify-between items-center px-gutter h-20 bg-primary shadow-lg">
<div className="flex items-center gap-12">
<div className="flex items-center gap-4">
<div className="w-10 h-10 bg-secondary-container rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-on-secondary-container font-bold">account_balance</span>
</div>
<h1 className="font-h3 text-h3 text-on-primary leading-tight">REAP 2024</h1>
</div>
<nav className="hidden lg:flex items-center gap-1">
<a className="px-4 py-2 text-on-primary/90 hover:text-on-primary hover:bg-white/10 rounded-full text-sm font-medium transition-all" href="#">Home</a>
<div className="relative group">
<button className="px-4 py-2 text-on-primary/90 hover:text-on-primary hover:bg-white/10 rounded-full text-sm font-medium transition-all flex items-center gap-1">
                        Institutions
                        <span className="material-symbols-outlined text-[18px]">expand_more</span>
</button>
</div>
<div className="relative group">
<button className="px-4 py-2 text-on-primary/90 hover:text-on-primary hover:bg-white/10 rounded-full text-sm font-medium transition-all flex items-center gap-1">
                        Guidelines
                        <span className="material-symbols-outlined text-[18px]">expand_more</span>
</button>
</div>
<a className="px-4 py-2 text-on-primary/90 hover:text-on-primary hover:bg-white/10 rounded-full text-sm font-medium transition-all" href="#">Notifications</a>
</nav>
</div>
<div className="flex items-center gap-4">
<div className="flex items-center gap-3 pr-4 border-r border-white/20">
<div className="text-right hidden sm:block">
<p className="text-sm font-semibold text-on-primary">{studentData.fullName || 'Student'}</p>
<p className="text-[10px] text-on-primary/60 uppercase tracking-widest font-bold">{mockReapId}</p>
</div>
<div className="relative">
<img alt="User Profile" className="w-10 h-10 rounded-full border-2 border-secondary-container" src="https://lh3.googleusercontent.com/aida/ADBb0ujxiUnsVPsHVRgQrFNmW5evWQ0kqCm1uchvJbZi-QW_ovX_3kG4Dyu6WSOk9ePoqneKijtKeH-Tp0W3be9fiJVKXBGdhJnevQ_KLssALsiN3T50bVRy95Z-056nSc0gzUxNjFPq4YS-wBGxgj3cEgA8V_EL-H17-Ce2hQYQvetyIjtPv3HaE1qQoKNKtwW20O5Z4xW44iADXM2SoQcXRnzQjEUjvr0fvQlkMFIpcH6FhlsBExSMuCwL5Ejzl9MskcfAhwOewsaLZhw"/>
<div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-primary rounded-full"></div>
</div>
</div>
<button className="text-on-primary/80 hover:text-secondary-fixed transition-colors flex items-center gap-2">
<span className="material-symbols-outlined">logout</span>
</button>
</div>
</header>
<div className="flex min-h-screen">
{/*  Sidebar Navigation  */}
<aside className={`bg-white border-r border-outline-variant flex flex-col fixed left-0 top-[116px] bottom-0 z-40 hidden md:flex py-6 shadow-sm relative transition-all duration-300 ${isSidebarExpanded ? 'w-64 px-4 items-start' : 'w-20 items-center'}`}>
<div className="absolute -right-3 top-4">
<button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className="w-6 h-6 bg-white border border-outline-variant rounded-full flex items-center justify-center shadow-sm hover:bg-surface-container transition-all cursor-pointer group z-50">
<span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-primary transition-colors" data-icon={isSidebarExpanded ? "chevron_left" : "chevron_right"}>{isSidebarExpanded ? "chevron_left" : "chevron_right"}</span>
</button>
</div>
{/*  Top Search  */}
<div className={`mb-8 flex items-center w-full ${isSidebarExpanded ? '' : 'justify-center'}`}>
<div className={`h-10 rounded-xl bg-surface-container flex items-center cursor-pointer hover:bg-surface-container-high transition-colors ${isSidebarExpanded ? 'w-full px-4 justify-start gap-2' : 'w-10 justify-center'}`}>
<span className="material-symbols-outlined text-on-surface-variant">search</span>
{isSidebarExpanded && <span className="text-sm text-on-surface-variant">Search...</span>}
</div>
</div>
{/*  Main Navigation Section  */}
<div className="w-full flex flex-col gap-1 px-2">
<span className={`font-label-caps text-[8px] text-outline mb-2 uppercase tracking-tighter ${isSidebarExpanded ? 'text-left' : 'text-center'}`}>Main</span>
<a className={`h-12 flex items-center rounded-xl transition-all group ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3 hover:bg-surface-container text-on-surface-variant' : 'w-12 flex-col justify-center gap-0.5 text-on-surface-variant hover:bg-surface-container'}`} href="/student-dashboard">
<span className="material-symbols-outlined text-[22px]">grid_view</span>
{isSidebarExpanded && <span className="font-button text-sm">Dashboard</span>}
</a>
<a className={`h-12 flex items-center rounded-xl transition-all shadow-sm ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3 bg-secondary-container text-on-secondary-container' : 'w-12 flex-col justify-center gap-0.5 bg-secondary-container text-on-secondary-container'}`} href="/student-information">
<span className="material-symbols-outlined fill text-[22px]">fact_check</span>
{isSidebarExpanded && <span className="font-button text-sm">Student Info</span>}
</a>
<a className={`h-12 flex items-center rounded-xl transition-all ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3 hover:bg-surface-container text-on-surface-variant' : 'w-12 flex-col justify-center gap-0.5 text-on-surface-variant hover:bg-surface-container'}`} href="#">
<span className="material-symbols-outlined text-[22px]">account_balance_wallet</span>
{isSidebarExpanded && <span className="font-button text-sm">Payments</span>}
</a>
<a className={`h-12 flex items-center rounded-xl transition-all ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3 hover:bg-surface-container text-on-surface-variant' : 'w-12 flex-col justify-center gap-0.5 text-on-surface-variant hover:bg-surface-container'}`} href="/choice-filling">
<span className="material-symbols-outlined text-[22px]">format_list_numbered</span>
{isSidebarExpanded && <span className="font-button text-sm">Choice Filling</span>}
</a>
<div className={`h-px bg-outline-variant my-4 ${isSidebarExpanded ? 'w-full' : 'w-8 mx-auto'}`}></div>
</div>
{/*  Bottom Profile  */}
<div className={`mt-auto mb-4 ${isSidebarExpanded ? 'w-full px-2' : 'flex justify-center'}`}>
<div className={`p-1 border-2 border-outline-variant rounded-xl flex items-center gap-3 ${isSidebarExpanded ? 'justify-start px-2 py-2' : 'w-fit'}`}>
<img alt="User Profile" className="w-10 h-10 rounded-lg object-cover shrink-0" src="https://lh3.googleusercontent.com/aida/ADBb0ujxiUnsVPsHVRgQrFNmW5evWQ0kqCm1uchvJbZi-QW_ovX_3kG4Dyu6WSOk9ePoqneKijtKeH-Tp0W3be9fiJVKXBGdhJnevQ_KLssALsiN3T50bVRy95Z-056nSc0gzUxNjFPq4YS-wBGxgj3cEgA8V_EL-H17-Ce2hQYQvetyIjtPv3HaE1qQoKNKtwW20O5Z4xW44iADXM2SoQcXRnzQjEUjvr0fvQlkMFIpcH6FhlsBExSMuCwL5Ejzl9MskcfAhwOewsaLZhw"/>
{isSidebarExpanded && (
  <div className="flex flex-col overflow-hidden">
    <span className="font-button text-sm text-on-surface truncate">{studentData.fullName || 'Student'}</span>
    <span className="text-[10px] text-on-surface-variant">Settings</span>
  </div>
)}
</div>
</div>
</aside>
{/*  Main Content Area  */}
<main className={`flex-grow bg-background p-12 mt-[52px] transition-all duration-300 ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
<div className="max-w-4xl mx-auto">
{/*  Progress Stepper  */}
<div className="mb-12">
<div className="flex items-center justify-between relative px-4">
{/*  Connector Lines  */}
<div className="absolute top-5 left-10 right-10 h-1 bg-surface-container-highest -translate-y-1/2 z-0"></div>
<div className="absolute top-5 left-10 w-1/4 h-1 bg-secondary -translate-y-1/2 z-0"></div>
{/*  Step 1  */}
<div className="relative z-10 flex flex-col items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary text-on-secondary-container flex items-center justify-center font-bold shadow-lg border-2 border-white ring-4 ring-secondary/20">1</div>
<span className="font-label-caps text-label-caps text-primary font-bold">Student Info</span>
</div>
{/*  Step 2  */}
<div className="relative z-10 flex flex-col items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container-lowest text-on-surface-variant flex items-center justify-center font-bold border-2 border-outline-variant shadow-sm">2</div>
<span className="font-label-caps text-label-caps text-on-surface-variant font-medium">Preferences</span>
</div>
{/*  Step 3  */}
<div className="relative z-10 flex flex-col items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container-lowest text-on-surface-variant flex items-center justify-center font-bold border-2 border-outline-variant shadow-sm">3</div>
<span className="font-label-caps text-label-caps text-on-surface-variant font-medium">Choice Filling</span>
</div>
</div>
</div>

{message.text && (
  <div className={`p-4 mb-6 rounded-xl border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
    {message.text}
  </div>
)}

{/*  Form Section  */}
<div className="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-xl overflow-hidden ring-1 ring-black/5">
<div className="bg-primary px-10 py-8 relative overflow-hidden">
<div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
<h2 className="font-h2 text-h2 text-on-primary relative z-10">Personal Details &amp; Academic Background</h2>
<p className="font-body-md text-body-md text-on-primary/70 mt-2 relative z-10">Please provide accurate information as per your official secondary school documents.</p>
</div>
<form className="p-10 space-y-10" onSubmit={handleSubmit}>
<div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
{/*  Full Name  */}
<div className="flex flex-col gap-2.5">
<label className="font-label-caps text-[11px] text-on-surface-variant uppercase font-bold tracking-widest" htmlFor="fullName">Full Name</label>
<input className="border border-outline-variant rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40" id="fullName" name="fullName" placeholder="As per Class 10 certificate" type="text" value={studentData.fullName} onChange={handleChange} required/>
</div>
{/*  Caste Category  */}
<div className="flex flex-col gap-2.5">
<label className="font-label-caps text-[11px] text-on-surface-variant uppercase font-bold tracking-widest" htmlFor="casteCategory">Caste Category</label>
<div className="relative">
<select className="w-full border border-outline-variant rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-body-md text-on-surface appearance-none bg-white" id="casteCategory" name="casteCategory" value={studentData.casteCategory} onChange={handleChange}>
<option disabled value="">Select Category</option>
<option value="General">General (Unreserved)</option>
<option value="OBC">OBC (NCL)</option>
<option value="SC">Scheduled Caste</option>
<option value="ST">Scheduled Tribe</option>
<option value="EWS">EWS</option>
</select>
<span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
</div>
</div>
{/*  JEE Percentile  */}
<div className="flex flex-col gap-2.5">
<label className="font-label-caps text-[11px] text-on-surface-variant uppercase font-bold tracking-widest" htmlFor="jeePercentile">JEE Percentile</label>
<div className="relative">
<input className="w-full border border-outline-variant rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40" id="jeePercentile" name="jeePercentile" placeholder="e.g. 98.4523" step="0.0001" type="number" value={studentData.jeePercentile} onChange={handleChange}/>
<span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-sm">%</span>
</div>
</div>
{/*  Class 12 Percentage  */}
<div className="flex flex-col gap-2.5">
<label className="font-label-caps text-[11px] text-on-surface-variant uppercase font-bold tracking-widest" htmlFor="class12Percentage">Class 12 Percentage</label>
<div className="relative">
<input className="w-full border border-outline-variant rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-body-md text-on-surface placeholder:text-on-surface-variant/40" id="class12Percentage" name="class12Percentage" placeholder="Aggregate %" step="0.01" type="number" value={studentData.class12Percentage} onChange={handleChange}/>
<span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold text-sm">%</span>
</div>
</div>
</div>
{/*  Domicile  */}
<div className="flex flex-col gap-5 pt-10 border-t border-outline-variant/50">
<span className="font-label-caps text-[11px] text-on-surface-variant uppercase font-bold tracking-widest">Domicile Status</span>
<div className="flex flex-wrap gap-8">
<label className="flex items-center gap-3 cursor-pointer group">
<div className="relative flex items-center justify-center">
<input className="peer appearance-none w-6 h-6 border-2 border-outline rounded-full checked:border-primary transition-all" name="domicile" type="radio" value="Rajasthan" checked={studentData.domicile === 'Rajasthan'} onChange={handleChange}/>
<div className="absolute w-3 h-3 bg-primary rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
</div>
<span className="font-body-md text-on-surface group-hover:text-primary transition-colors font-medium">Rajasthan Resident</span>
</label>
<label className="flex items-center gap-3 cursor-pointer group">
<div className="relative flex items-center justify-center">
<input className="peer appearance-none w-6 h-6 border-2 border-outline rounded-full checked:border-primary transition-all" name="domicile" type="radio" value="Outside Rajasthan" checked={studentData.domicile === 'Outside Rajasthan'} onChange={handleChange}/>
<div className="absolute w-3 h-3 bg-primary rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
</div>
<span className="font-body-md text-on-surface group-hover:text-primary transition-colors font-medium">Outside Rajasthan</span>
</label>
</div>
</div>
{/*  Ex-serviceman Category  */}
<div className="flex flex-col gap-5 pt-10 border-t border-outline-variant/50">
<span className="font-label-caps text-[11px] text-on-surface-variant uppercase font-bold tracking-widest">Ex-serviceman Category</span>
<div className="flex flex-wrap gap-8">
<label className="flex items-center gap-3 cursor-pointer group">
<div className="relative flex items-center justify-center">
<input className="peer appearance-none w-6 h-6 border-2 border-outline rounded-full checked:border-primary transition-all" name="exServiceman" type="radio" value="Yes" checked={studentData.exServiceman === 'Yes'} onChange={handleChange}/>
<div className="absolute w-3 h-3 bg-primary rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
</div>
<span className="font-body-md text-on-surface group-hover:text-primary transition-colors font-medium">Yes, I belong to this category</span>
</label>
<label className="flex items-center gap-3 cursor-pointer group">
<div className="relative flex items-center justify-center">
<input className="peer appearance-none w-6 h-6 border-2 border-outline rounded-full checked:border-primary transition-all" name="exServiceman" type="radio" value="No" checked={studentData.exServiceman === 'No'} onChange={handleChange}/>
<div className="absolute w-3 h-3 bg-primary rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
</div>
<span className="font-body-md text-on-surface group-hover:text-primary transition-colors font-medium">No</span>
</label>
</div>
</div>
{/*  Action Buttons  */}
<div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-10 border-t border-outline-variant/50">
<button className="w-full sm:w-auto px-8 py-4 font-button text-primary border-2 border-primary/20 rounded-xl hover:bg-primary hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2" type="button" onClick={() => window.location.href = '/student-dashboard'}>
<span className="material-symbols-outlined text-[20px]">drafts</span>
                                Go to Dashboard
                            </button>
<button className="w-full sm:w-auto px-10 py-4 font-button text-on-secondary-fixed bg-secondary-container rounded-xl shadow-lg shadow-secondary-container/20 hover:bg-secondary-container/90 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-3" type="submit">
                                Save &amp; Continue
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
</div>
</form>
</div>
{/*  Footer Visual  */}
<div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
<div className="p-8 bg-white rounded-2xl border border-outline-variant shadow-sm flex flex-col justify-center gap-4">
<div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-green-600 text-3xl">verified</span>
</div>
<div>
<h4 className="font-bold text-primary text-lg">Official Admission Portal</h4>
<p className="text-body-sm text-on-surface-variant mt-1 leading-relaxed">Verified by the Rajasthan Engineering Admission Process committee for the academic session 2024-25. All data is securely encrypted.</p>
</div>
</div>
<div className="relative rounded-2xl overflow-hidden group border border-outline-variant shadow-sm">
<img alt="University Campus" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="A grand architectural shot of a modern Indian engineering college campus. The building features large glass facades and traditional sandstone elements reflecting Rajasthan's heritage. The lighting is golden-hour sunlight creating long shadows and a prestigious, official atmosphere. Pristine landscaping and clear blue skies enhance the academic excellence aesthetic." src="https://lh3.googleusercontent.com/aida/ADBb0ujw4GJlhv3VvICRlrzn0ydRanxkfc5LeRv6GL99iJdEwyxb89UcMfB4PzwkAcrKdUUDjb6BeK_gnsBR_8-mKFunjlsn7XkZpf0a4sBEXhhdBm-6dIjnqyuIynqy3XD3ZzvyGay-V8P5dgqQtTqouNfGEIhkPUdV1gZhX0x9UW0QGr27iS9Dqden-H5jdgrL4sVBSSoucUDLRpSeSRmxsGppJIviuCvwdfIiui9RgeqhkhaqENkNCzi_gcENHzsMdKDClTGkAlzV4T8"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent flex items-end p-6">
<p className="text-white text-xs font-medium italic">Empowering Rajasthan's next generation of engineers</p>
</div>
</div>
</div>
</div>
</main>
</div>

    </div>
  );
}
