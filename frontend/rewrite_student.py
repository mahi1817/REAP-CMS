import sys

def rewrite():
    with open('src/StudentInformation.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add useState
    content = content.replace('import React from \'react\';', 'import React, { useState } from \'react\';')
    content = content.replace('export default function StudentInformation() {', 'export default function StudentInformation() {\n  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);\n')

    # 2. Replace the aside block
    aside_start = content.find('{/*  Sidebar Navigation  */}')
    main_end = content.find('<main className=\"flex-grow md:ml-20 bg-background p-12 mt-[52px]\">') + len('<main className=\"flex-grow md:ml-20 bg-background p-12 mt-[52px]\">')
    
    if aside_start == -1 or main_end == -1:
        print('Could not find aside or main bounds')
        return

    new_aside = '''{/*  Sidebar Navigation  */}
<aside className={`bg-white border-r border-outline-variant flex flex-col fixed left-0 top-[116px] bottom-0 z-40 hidden md:flex py-6 shadow-sm relative transition-all duration-300 ${isSidebarExpanded ? 'w-64 px-4 items-start' : 'w-20 items-center'}`}>
<div className=\"absolute -right-3 top-4\">
<button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className=\"w-6 h-6 bg-white border border-outline-variant rounded-full flex items-center justify-center shadow-sm hover:bg-surface-container transition-all cursor-pointer group z-50\">
<span className=\"material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-primary transition-colors\" data-icon={isSidebarExpanded ? \"chevron_left\" : \"chevron_right\"}>{isSidebarExpanded ? \"chevron_left\" : \"chevron_right\"}</span>
</button>
</div>
{/*  Top Search  */}
<div className={`mb-8 flex items-center w-full ${isSidebarExpanded ? '' : 'justify-center'}`}>
<div className={`h-10 rounded-xl bg-surface-container flex items-center cursor-pointer hover:bg-surface-container-high transition-colors ${isSidebarExpanded ? 'w-full px-4 justify-start gap-2' : 'w-10 justify-center'}`}>
<span className=\"material-symbols-outlined text-on-surface-variant\">search</span>
{isSidebarExpanded && <span className=\"text-sm text-on-surface-variant\">Search...</span>}
</div>
</div>
{/*  Main Navigation Section  */}
<div className=\"w-full flex flex-col gap-1 px-2\">
<span className={`font-label-caps text-[8px] text-outline mb-2 uppercase tracking-tighter ${isSidebarExpanded ? 'text-left' : 'text-center'}`}>Main</span>
<a className={`h-12 flex items-center rounded-xl transition-all group ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3 hover:bg-surface-container text-on-surface-variant' : 'w-12 flex-col justify-center gap-0.5 text-on-surface-variant hover:bg-surface-container'}`} href=\"#\">
<span className=\"material-symbols-outlined text-[22px]\">grid_view</span>
{isSidebarExpanded && <span className=\"font-button text-sm\">Dashboard</span>}
</a>
<a className={`h-12 flex items-center rounded-xl transition-all shadow-sm ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3 bg-secondary-container text-on-secondary-container' : 'w-12 flex-col justify-center gap-0.5 bg-secondary-container text-on-secondary-container'}`} href=\"#\">
<span className=\"material-symbols-outlined fill text-[22px]\">fact_check</span>
{isSidebarExpanded && <span className=\"font-button text-sm\">Student Info</span>}
</a>
<a className={`h-12 flex items-center rounded-xl transition-all ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3 hover:bg-surface-container text-on-surface-variant' : 'w-12 flex-col justify-center gap-0.5 text-on-surface-variant hover:bg-surface-container'}`} href=\"#\">
<span className=\"material-symbols-outlined text-[22px]\">account_balance_wallet</span>
{isSidebarExpanded && <span className=\"font-button text-sm\">Payments</span>}
</a>
<a className={`h-12 flex items-center rounded-xl transition-all ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3 hover:bg-surface-container text-on-surface-variant' : 'w-12 flex-col justify-center gap-0.5 text-on-surface-variant hover:bg-surface-container'}`} href=\"#\">
<span className=\"material-symbols-outlined text-[22px]\">notifications</span>
{isSidebarExpanded && <span className=\"font-button text-sm\">Notifications</span>}
</a>
<div className={`h-px bg-outline-variant my-4 ${isSidebarExpanded ? 'w-full' : 'w-8 mx-auto'}`}></div>
</div>
{/*  Messages Section  */}
<div className=\"w-full flex flex-col gap-4 px-2\">
<span className={`font-label-caps text-[8px] text-outline mb-1 uppercase tracking-tighter ${isSidebarExpanded ? 'text-left' : 'text-center'}`}>Messages</span>
<div className={`flex items-center gap-3 ${isSidebarExpanded ? 'justify-start px-2' : 'justify-center'}`}>
<div className=\"relative shrink-0\">
<img alt=\"User 1\" className=\"w-8 h-8 rounded-full object-cover\" src=\"https://lh3.googleusercontent.com/a/ACg8ocL-fL1rW1fV-w5t6wzV1f9V6vV6vV6vV6vV6vV6vV6v=s96-c\"/>
<div className=\"absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-white rounded-full\"></div>
</div>
{isSidebarExpanded && (
  <div className=\"flex flex-col\">
    <span className=\"text-sm font-semibold text-on-surface\">Admission Cell</span>
    <span className=\"text-xs text-on-surface-variant truncate w-32\">Document verified</span>
  </div>
)}
</div>
<div className={`flex items-center gap-3 ${isSidebarExpanded ? 'justify-start px-2' : 'justify-center'}`}>
<div className=\"relative shrink-0\">
<img alt=\"User 2\" className=\"w-8 h-8 rounded-full object-cover\" src=\"https://lh3.googleusercontent.com/a/ACg8ocL-fL1rW1fV-w5t6wzV1f9V6vV6vV6vV6vV6vV6vV6v=s96-c\"/>
<div className=\"absolute bottom-0 right-0 w-2 h-2 bg-red-500 border-2 border-white rounded-full\"></div>
</div>
{isSidebarExpanded && (
  <div className=\"flex flex-col\">
    <span className=\"text-sm font-semibold text-on-surface\">Helpdesk</span>
    <span className=\"text-xs text-on-surface-variant truncate w-32\">Query #492 closed</span>
  </div>
)}
</div>
<div className={`flex items-center gap-3 ${isSidebarExpanded ? 'justify-start px-2' : 'justify-center'}`}>
<div className=\"relative shrink-0\">
<img alt=\"User 3\" className=\"w-8 h-8 rounded-full object-cover\" src=\"https://lh3.googleusercontent.com/a/ACg8ocL-fL1rW1fV-w5t6wzV1f9V6vV6vV6vV6vV6vV6vV6v=s96-c\"/>
<div className=\"absolute bottom-0 right-0 w-2 h-2 bg-green-500 border-2 border-white rounded-full\"></div>
</div>
{isSidebarExpanded && (
  <div className=\"flex flex-col\">
    <span className=\"text-sm font-semibold text-on-surface\">Coordinator</span>
    <span className=\"text-xs text-on-surface-variant truncate w-32\">Welcome to REAP!</span>
  </div>
)}
</div>
</div>
{/*  Bottom Profile  */}
<div className={`mt-auto mb-4 ${isSidebarExpanded ? 'w-full px-2' : 'flex justify-center'}`}>
<div className={`p-1 border-2 border-outline-variant rounded-xl flex items-center gap-3 ${isSidebarExpanded ? 'justify-start px-2 py-2' : 'w-fit'}`}>
<img alt=\"User Profile\" className=\"w-10 h-10 rounded-lg object-cover shrink-0\" src=\"https://lh3.googleusercontent.com/aida/ADBb0ujxiUnsVPsHVRgQrFNmW5evWQ0kqCm1uchvJbZi-QW_ovX_3kG4Dyu6WSOk9ePoqneKijtKeH-Tp0W3be9fiJVKXBGdhJnevQ_KLssALsiN3T50bVRy95Z-056nSc0gzUxNjFPq4YS-wBGxgj3cEgA8V_EL-H17-Ce2hQYQvetyIjtPv3HaE1qQoKNKtwW20O5Z4xW44iADXM2SoQcXRnzQjEUjvr0fvQlkMFIpcH6FhlsBExSMuCwL5Ejzl9MskcfAhwOewsaLZhw\"/>
{isSidebarExpanded && (
  <div className=\"flex flex-col overflow-hidden\">
    <span className=\"font-button text-sm text-on-surface truncate\">Rahul Sharma</span>
    <span className=\"text-[10px] text-on-surface-variant\">Settings</span>
  </div>
)}
</div>
</div>
</aside>
{/*  Main Content Area  */}
<main className={`flex-grow bg-background p-12 mt-[52px] transition-all duration-300 ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-20'}`}>'''

    content = content[:aside_start] + new_aside + content[main_end:]
    
    with open('src/StudentInformation.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
        
rewrite()
