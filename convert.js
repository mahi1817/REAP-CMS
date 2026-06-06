const fs = require('fs');
const path = require('path');

const srcDir = path.join('c:', 'Users', 'VICTUS', 'Desktop', 'Application', 'stitch_design');
const destDir = path.join('c:', 'Users', 'VICTUS', 'Desktop', 'Application', 'frontend', 'src');

const files = fs.readdirSync(srcDir).filter(f => !f.endsWith('.png'));

files.forEach(file => {
  let content = fs.readFileSync(path.join(srcDir, file), 'utf-8');
  
  // Extract body content
  const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (!bodyMatch) return;
  let body = bodyMatch[1];

  // Convert HTML to JSX
  body = body.replace(/class=/g, 'className=');
  body = body.replace(/for=/g, 'htmlFor=');
  body = body.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  
  // Convert inline styles
  body = body.replace(/style="([^"]+)"/g, (match, p1) => {
    const styleObj = p1.split(';').filter(s => s.trim()).reduce((acc, curr) => {
      let [key, value] = curr.split(':');
      if (key && value) {
        key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        acc.push(`${key}: '${value.trim().replace(/'/g, "\\'")}'`);
      }
      return acc;
    }, []).join(', ');
    return `style={{ ${styleObj} }}`;
  });

  // Some extra cleanup for unclosed tags
  body = body.replace(/<img([^>]*?)(?<!\/)>/gi, '<img$1 />');
  body = body.replace(/<input([^>]*?)(?<!\/)>/gi, '<input$1 />');
  body = body.replace(/<br>/gi, '<br />');
  body = body.replace(/<hr>/gi, '<hr />');

  // Also fix attributes like checked
  body = body.replace(/ checked=""/g, ' checked');
  body = body.replace(/ disabled=""/g, ' disabled');
  body = body.replace(/ selected=""/g, ' selected');
  
  // Wrap in a component
  const componentName = file.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
  const jsxContent = `import React from 'react';\n\nexport default function ${componentName}() {\n  return (\n    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen">\n      ${body}\n    </div>\n  );\n}\n`;

  fs.writeFileSync(path.join(destDir, componentName + '.jsx'), jsxContent);
});
console.log('Conversion done.');
