import sys

def rewrite():
    with open('src/ChoiceFilling.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Add useState
    content = content.replace('import React from \'react\';', 'import React, { useState } from \'react\';')
    content = content.replace('export default function ChoiceFilling() {', 'export default function ChoiceFilling() {\n  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);\n')

    # 2. Replace the aside block
    aside_start = content.find('{/*  SideNavBar  */}')
    main_end = content.find('<main className=\"ml-20 mt-24 p-gutter min-h-screen\">') + len('<main className=\"ml-20 mt-24 p-gutter min-h-screen\">')
    
    if aside_start == -1 or main_end == -1:
        print('Could not find aside or main bounds')
        return

    new_aside = '''{/*  SideNavBar  */}
<aside className={`fixed left-0 top-24 h-[calc(100vh-96px)] bg-surface-container-lowest dark:bg-surface-container-low border-r border-outline-variant flex flex-col pt-4 pb-6 z-40 transition-all duration-300 ${isSidebarExpanded ? 'w-64 px-4 items-start' : 'w-20 items-center'}`}>
<button onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className=\"absolute -right-3 top-4 w-6 h-6 bg-surface-container-lowest border border-outline-variant rounded-full flex items-center justify-center shadow-sm hover:bg-surface-container hover:border-primary/30 transition-all z-50 group\">
<span className=\"material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-primary transition-transform duration-300\" data-icon={isSidebarExpanded ? \"chevron_left\" : \"chevron_right\"}>
  {isSidebarExpanded ? \"chevron_left\" : \"chevron_right\"}
</span>
</button>
<div className=\"flex flex-col gap-6 w-full mt-4\">
{/*  Search Icon  */}
<button className={`h-12 flex items-center rounded-2xl hover:bg-surface-container-high transition-colors text-on-surface-variant ${isSidebarExpanded ? 'w-full px-4 justify-start' : 'w-12 justify-center'}`}>
<span className=\"material-symbols-outlined text-on-surface-variant\">search</span>
{isSidebarExpanded && <span className=\"ml-3 font-body-sm\">Search</span>}
</button>
{/*  Main Section  */}
<div className=\"w-full flex flex-col gap-2\">
<span className={`text-[10px] font-bold text-on-surface-variant/50 tracking-tighter uppercase mb-1 ${isSidebarExpanded ? 'text-left' : 'text-center'}`}>Main</span>
<a className={`h-12 flex items-center rounded-2xl text-on-surface-variant hover:bg-surface-container-high transition-all group ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3' : 'w-12 justify-center'}`} href=\"#\">
<span className=\"material-symbols-outlined group-hover:scale-110 transition-transform\">dashboard</span>
{isSidebarExpanded && <span className=\"font-button text-sm\">Dashboard</span>}
</a>
<a className={`h-12 flex items-center rounded-2xl bg-primary text-on-primary shadow-lg shadow-primary/20 transition-all ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3' : 'w-12 justify-center'}`} href=\"#\">
<span className=\"material-symbols-outlined\">edit_square</span>
{isSidebarExpanded && <span className=\"font-button text-sm\">Choice Filling</span>}
</a>
<a className={`h-12 flex items-center rounded-2xl text-on-surface-variant hover:bg-surface-container-high transition-all group ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3' : 'w-12 justify-center'}`} href=\"#\">
<span className=\"material-symbols-outlined group-hover:scale-110 transition-transform\">verified_user</span>
{isSidebarExpanded && <span className=\"font-button text-sm\">Verification</span>}
</a>
<a className={`h-12 flex items-center rounded-2xl text-on-surface-variant hover:bg-surface-container-high transition-all group ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3' : 'w-12 justify-center'}`} href=\"#\">
<span className=\"material-symbols-outlined group-hover:scale-110 transition-transform\">settings</span>
{isSidebarExpanded && <span className=\"font-button text-sm\">Settings</span>}
</a>
</div>
<div className={`h-px bg-outline-variant/30 ${isSidebarExpanded ? 'w-full' : 'w-8 mx-auto'}`}></div>
{/*  Messages/Support Section  */}
<div className=\"w-full flex flex-col gap-2\">
<span className={`text-[10px] font-bold text-on-surface-variant/50 tracking-tighter uppercase mb-1 ${isSidebarExpanded ? 'text-left' : 'text-center'}`}>Messages</span>
<button className={`h-10 flex items-center rounded-full bg-surface-container-high text-primary hover:bg-primary/10 transition-all ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3' : 'w-10 justify-center'}`}>
<span className=\"material-symbols-outlined text-[20px]\">headset_mic</span>
{isSidebarExpanded && <span className=\"font-button text-sm\">Support</span>}
</button>
<button className={`h-10 flex items-center rounded-full border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all ${isSidebarExpanded ? 'w-full px-4 justify-start gap-3' : 'w-10 justify-center'}`}>
<span className=\"material-symbols-outlined text-[18px]\">notifications</span>
{isSidebarExpanded && <span className=\"font-button text-sm\">Alerts</span>}
</button>
</div>
</div>
<div className={`mt-auto flex items-center gap-4 ${isSidebarExpanded ? 'w-full' : 'flex-col'}`}>
<div className=\"relative group cursor-pointer flex items-center gap-3\">
<img alt=\"User Profile\" className=\"w-12 h-12 rounded-2xl border-2 border-primary/5 group-hover:border-primary transition-all object-cover shrink-0\" src=\"https://lh3.googleusercontent.com/aida/ADBb0ujxiUnsVPsHVRgQrFNmW5evWQ0kqCm1uchvJbZi-QW_ovX_3kG4Dyu6WSOk9ePoqneKijtKeH-Tp0W3be9fiJVKXBGdhJnevQ_KLssALsiN3T50bVRy95Z-056nSc0gzUxNjFPq4YS-wBGxgj3cEgA8V_EL-H17-Ce2hQYQvetyIjtPv3HaE1qQoKNKtwW20O5Z4xW44iADXM2SoQcXRnzQjEUjvr0fvQlkMFIpcH6FhlsBExSMuCwL5Ejzl9MskcfAhwOewsaLZhw\"/>
<div className=\"absolute -bottom-1 -left-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full\"></div>
{isSidebarExpanded && (
  <div className=\"flex flex-col\">
    <span className=\"font-button text-on-surface truncate w-32\">Siddharth Sharma</span>
    <span className=\"text-[10px] text-on-surface-variant font-label-caps\">ID: REAP-2024</span>
  </div>
)}
</div>
</div></aside>
{/*  Main Content Canvas  */}
<main className={`mt-24 p-gutter min-h-screen transition-all duration-300 ${isSidebarExpanded ? 'ml-64' : 'ml-20'}`}>'''

    content = content[:aside_start] + new_aside + content[main_end:]
    
    with open('src/ChoiceFilling.jsx', 'w', encoding='utf-8') as f:
        f.write(content)
        
rewrite()
