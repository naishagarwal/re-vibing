const fs = require('fs');
const path = require('path');
const w = (p, c) => { 
  fs.mkdirSync(path.dirname(p), {recursive: true}); 
  fs.writeFileSync(p, '/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */\n"use client";\nimport React, { useState, useEffect, useRef } from "react";\nimport Link from "next/link";\n\n' + c.trim() + '\n'); 
};
const wMD = (p, c) => { fs.writeFileSync(p, c.trim() + '\n'); };

// CROSSY
w('src/app/crossy-pinch/page.tsx', `
export default function CrossYPinch() {
  const [pinching, setPinching] = useState(false);
  const [selected, setSelected] = useState(false);
  
  return (
    <div className="p-8 max-w-5xl mx-auto font-sans select-none">
      <Link href="/" className="text-orange-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">CrossY: Pinch-to-Select</h1>
      <p className="mb-6 text-gray-600">Design Decision: User selects a boundary not by crossing one line with one pointer, but by pinching two pointers across it.</pconst w = (p, c) => { 
  fs.hi  fs.mkdirSync(path.d t  fs.writeFileSync(p, '/* eslint-disable @typescrip64};
const wMD = (p, c) => { fs.writeFileSync(p, c.trim() + '\n'); };

// CROSSY
w('src/app/crossy-pinch/page.tsx', `
export default function CrossYPinch() {
  const [pinching, setPinching] = useState(false);
  const [selected, setSelected] = useSutc w
// CROSSY
w('src/apunded-full transition-all \${selected ? 'bordew('src/a50export default : 'border-orange-500'}  const [pinching, setPinching] = useS    const [selected, setSelected] = useState(false w-  
  return (
    <div className="p-8 max-w-5xl m3 ani    <div ">      <Link href="/" className="text-orange-600 mb-4 block hover0/      <h1 className="text-3xl font-bold mb-2">CrossY: Pinch-to-Select</h1>
      <p classN/d      <p className="mb-6 text-gray-600">Design Decision: User selects a b`#  fs.hi  fs.mkdirSync(path.d t  fs.writeFileSync(p, '/* eslint-disable @typescrip64};
const wMD = (p, c) => { fs.writeFileSync(p, c.trim() + '\n'); };

// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { fs.writeFileSync(p, c.trim() + '\n'); };

// CROSSY
w('src/aw-
// CROSSY
w('src/app/crossy-pinch/page.tsx', `
export default angw('src/a-4export default function CrossYPinchin  const [pinching, setPinching] = useSbo  const [selected, setSelected] = useSutc w
// CRam// CROSSY
w('src/apunded-full transition-astw('src/aer  return (
    <div className="p-8 max-w-5xl m3 ani    <div ">      <Link href="/" className="text-orange-600 mb-4 block hover0/      <h1 className="text-3xl font-bold mb-2">CrossY: 0 flex flex-co    <div en      <p classN/d      <p className="mb-6 text-gray-600">Design Decision: User selects a b`#  fs.hi  fs.mkdirSync(path.d t  fs.writeFileSync(p, '/* eslint-disable @typescrip64};
const wMD = ndconst wMD = (p, c) => { fs.writeFileSync(p, c.trim() + '\n'); };

// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { fs.writeFileSync(p, c.trim() + '\n'); };

// CROSpl
// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { for(w('src/acl
// CROSSY
w('src/aw-
// CROSSY
w('src/app/crossy-pinch/page.tsx', `
export default angw('r-bw('src/ada// CROSSYivw('src/a  export default angw('src/a-4export r(// CRam// CROSSY
w('src/apunded-full transition-astw('src/aer  return (
    <div className="p-8 max-w-5xl m3 ani    <div ">      <Link href="/" clav w('src/apunded-)=    <div className="p-8 max-w-5xl m3 ani    <div ">  -0const wMD = ndconst wMD = (p, c) => { fs.writeFileSync(p, c.trim() + '\n'); };

// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { fs.writeFileSync(p, c.trim() + '\n'); };

// CROSpl
// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { for(w('src/acl
// CROSSY
w('src/aw-
// CROSSY
w('src/app/crossy-pinch/page.tsx', `
export default angw('r-bw('src/ada/Ra
// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { fs.writeFileSyn crw('src/aut
// CROSpl
// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { for(w('src/acl
//  Cr// CROSStcw('src/aco// CROSSY
w('src/aw-
// CROSSY
w('src/app/crossy-pinch/page.tsx'amw('src/aax-w-5xl mx-aw('src/a-sexport default angw('r-bw('src/ada/e="text-orange-600 mb-4 block hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold mb-2">Cr    <div className="p-8 max-w-5xl m3 ani    <div ">  gr
// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { fs.writeFileSync(p, c.trim() + '\n'); };

// CROSpl
// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { for(w('src/acl
// CROSSY
w('src/aw-
// CROSSY
w('sr-orw('src/a f
// CROSpl
// CROSSY
w('src/app/crosster h-96 relative">
         <div className="w-64 h-32 b// CROSS00w('src/a4 // CROSSY
w('src/aw-
// CROSSY
w('src/app/crossy-pinch/page.tsx's-w('src/aus// CROSSYer cursor-crexport default angw('r-b => setProg(p// CROSSY
w('src/app/crossy-pinc      w('src/ala// CROSpl
// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { for(w('ct// CROSS  w('src/a  //  Cr// CROSStcw('src/aco// CROSSY
w('src/aw-
// CROSSY
w('src/nsw('src/aw-
// CROSSY
w('src/appwidth// CROSSYogw('src/a/d      <h1 className="text-3xl font-bold mb-2">Cr    <div className="p-8 max-w-5xl m3 ani    <div ">  gr
// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) =>ra// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { fs.writeFileSync(p, c.trim() + '\n'); };
y w('src/a t
// CROSpl
// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { for(w('src/acl
// rad// CROSStsw('src/apo// CROSSY
w('src/aw-
// CROSSY
w('sr-orw('src/a f
// CROSpl
// Catw('src/a, // CROSSY  w('sr-orrg// CROSpl
//00, y: // CROSSx:w('src/a 1         <div className="w-64 h-32(
w('src/aw-
// CROSSY
w('src/app/crossy-pinch/page.tsx's-w('src/ak // CROSSYclw('src/a"tw('src/app/crossy-pinc      w('src/ala// CROSpl
// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { fo M// CROSSY
w('src/app/crossy-pinch/ponconst wMDxtw('src/a0"w('src/aw-
// CROSSY
w('src/nsw('src/aw-
// CROSSY
w('src/appwidth// CROSSYogw('src/a/d      <h1 className="text-3ss//me="relatw('src/n00// CROSSY
w('src/auto border-4// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) =>ra// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { fs.writeFileSync()}w('src/a  w('src/app/crossy-pinch/ponconst wMD = (p, c) => { fs.writ/8y w('src/a t
// CROSpl
// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { for(w(nd// CROSpl
/            w('src/a.m// rad// CROSStsw('src/apo// CROSSY
w('src/aw-
// CROSSY
wed-500 rw('src/aw-
// CROSSY
w('sr-orw('sr00// CROSSYp:w('sr-or00// CROSpl
// Catw}
// Catw   //00, y: // CROSSx:w('src/a 1         <div clrdw('src/aw-
// CROSSY
w('src/app/crossy-pinch/page.tsx's-w('src/0)// CROSS/diw('src/a  // CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { fo M// CROSSY
w('src/app/crossy-pinch/ponconst wMDxdaw('src/aa w('src/app/crossy-pinch/ponconst wMDxtw('src/a0"w('src/aw-
/ than// CROSSY
w('src/nsw('src/aw-
// CROSSY
w('src/appwidth//wew('src/n/p// CROSSY
w('src/a dw('src/aunw('src/auto border-4// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) =>ra// CROSSY
classNw('src/app/crossy-pinch/ponconw('src/app/crossy-pinch/ponconst wMD = (p, c) => { fs.writb-// CROSpl
// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { for(w(nd// CROSpl
/            w('src/a.m// rad// CROSStsw('src/apo// CROSSY
w('si// CROSSiow('Edges o/            w('src/a.m// rad// CROSStsw('src/apo// CROSSY
w('src/a iw('src/aw-
// CROSSY
wed-500 rw('src/aw-
// CROSSY
w('sr-00// CROSSY0pwed-500 to// CROSSY
w('sr-orlaw('sr-orlo// Catw}
// Catw   //00, y: // CROSSx:w('srcal// Catw  // CROSSY
w('src/app/crossy-pinch/page.tsx's-w('src/0)// CROSS/diwx w('s(255,0w('src/app/crossy-pinch/ponc0 ? 20 : 0}px 0 30px rgba(0,0,255,0.5)\`}}
    w('src/app/crossy-pinch/ponconst wMDxdaw('src/aa w('src/app/cro 4/ than// CROSSY
w('src/nsw('src/aw-
// CROSSY
w('src/appwidth//wew('src/n/p// CROSSY
w('src/a dw('src/aunw mw('src/nsw('srte// CROSSY
w('src/a  w('src/a
 w('src/a dw('src/aunw('src/auto bordee-w('src/app/crossy-pinch/ponconst wMD = (p, c) =>nVclassNw('src/app/crossy-pinch/ponconw('src/app/crossy-pincx-// CROSSY
w('src/app/crossy-pinch/ponconst wMD = (p, c) => { for(w(nd// CROSpl
/            w('src/a.m//edw('src/a()/            w('src/a.m// rad// CROSStsw('src/apo// CROSSY
w('si//  <w('si// CROSSiow('Edges o/            w('src/a.m// rad// inw('src/a iw('src/aw-
// CROSSY
wed-500 rw('src/aw-
// CROSSY
w('sr-00// CROSSY0pwe  // CROSSY
wed-500 rtewed-500 on// CROSSY
w('sr-00: w('sr-00s<w('sr      <p className="mb-6 text-gray// Catw   //00, y: // CROSSwsw('src/app/crossy-pinch/page.tsx's-w('src/0)// CROSS/dul    w('src/app/crossy-pinch/ponconst wMDxdaw('src/aa w('src/app/cro 4/ than// CROSSY
w('src/nsw('src/aw-
// CROSSY
w('src/appwidth//wew('ayw('src/nsw('src/aw-
// CROSSY
w('src/appwidth//wew('src/n/p// CROSSY
w('src/a dw('sti// CROSSY
w('src/a>
w('src/a  w('src/a dw('src/aunw mw('src/nsw('sr-1w('src/a  w('src/a
 w('src/a dw('src/aunw('src/te w('src/a dw('src{{w('src/app/crossy-pinch/ponconst wMD = (p, c) => { for(w(nd// CROSpl
/            w('src/a.m//edw('src/a()/            w('src/a.m// rad// CROSStsw('src/apo//  s/            w('src/a.m//edw('src/a()/            w('src/a.m// rad/  w('si//  <w('si// CROSSiow('Edges o/            w('src/a.m// rad// inw('src/a iw('src/aw-
// Cro// CROSSY
wed-500 rw('src/aw-
// CROSSY
w('sr-00// CROSSY0pwe  // CROSSY
wed-500 rtewed-stwed-500 ges.`);

