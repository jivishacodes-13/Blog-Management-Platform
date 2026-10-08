import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { initialBlogs } from './data/blogs';
import { getBlogs, saveBlogs, getSet, saveSet } from './utils/storage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import BlogDetails from './pages/BlogDetails';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import ManageBlogs from './pages/ManageBlogs';
import Bookmarks from './pages/Bookmarks';
import NotFound from './pages/NotFound';

export default function App(){
 const [blogs,setBlogs]=useState(()=>getBlogs()||initialBlogs);
 const [bookmarks,setBookmarks]=useState(()=>getSet('bookmarks'));
 const [liked,setLiked]=useState(()=>getSet('liked'));
 const [dark,setDark]=useState(()=>localStorage.getItem('inkwell_theme')==='dark');
 const [toast,setToast]=useState('');
 useEffect(()=>saveBlogs(blogs),[blogs]);
 useEffect(()=>saveSet('bookmarks',bookmarks),[bookmarks]);
 useEffect(()=>saveSet('liked',liked),[liked]);
 useEffect(()=>{document.documentElement.classList.toggle('dark',dark);localStorage.setItem('inkwell_theme',dark?'dark':'light')},[dark]);
 useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),2800);return()=>clearTimeout(t)},[toast]);
 const notify=(m)=>setToast(m);
 const toggleBookmark=(id)=>setBookmarks(s=>{const n=new Set(s); if(n.has(id)){n.delete(id);notify('Removed from bookmarks')}else{n.add(id);notify('Saved to bookmarks')} return n});
 const toggleLike=(id)=>setLiked(s=>{const n=new Set(s);setBlogs(bs=>bs.map(b=>b.id===id?{...b,likes:Math.max(0,b.likes+(n.has(id)?-1:1))}:b));if(n.has(id)){n.delete(id)}else{n.add(id)} return n});
 const addBlog=(data)=>{const id=crypto.randomUUID();const content = Array.isArray(data.content) ? data.content : String(data.content || '').split(/\n\s*\n/).filter(Boolean).map(x=>['p',x]); const blog={...data,id,date:new Date().toISOString().slice(0,10),likes:0,content};setBlogs(b=>[blog,...b]);notify('Story published successfully');return id};
 const updateBlog=(id,data)=>{setBlogs(b=>b.map(x=>x.id===id?{...x,...data}:x));notify('Story updated successfully')};
 const deleteBlog=(id)=>{setBlogs(b=>b.filter(x=>x.id!==id));setBookmarks(s=>{const n=new Set(s);n.delete(id);return n});setLiked(s=>{const n=new Set(s);n.delete(id);return n});notify('Story deleted');};
 return <div className="min-h-screen bg-[#f8f7f4] text-neutral-950 transition-colors dark:bg-[#11110f] dark:text-neutral-100"><Navbar dark={dark} toggleTheme={()=>setDark(v=>!v)}/><main><Routes><Route path="/" element={<Home blogs={blogs} bookmarks={bookmarks} liked={liked} onBookmark={toggleBookmark} onLike={toggleLike}/>}/><Route path="/blog/:id" element={<BlogDetails blogs={blogs} bookmarks={bookmarks} liked={liked} onBookmark={toggleBookmark} onLike={toggleLike}/>}/><Route path="/create" element={<CreateBlog onCreate={addBlog}/>}/><Route path="/edit/:id" element={<EditBlog blogs={blogs} onUpdate={updateBlog}/>}/><Route path="/manage" element={<ManageBlogs blogs={blogs} onDelete={deleteBlog}/>}/><Route path="/bookmarks" element={<Bookmarks blogs={blogs} bookmarks={bookmarks} liked={liked} onBookmark={toggleBookmark} onLike={toggleLike}/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/><Toast message={toast} onClose={()=>setToast('')}/></div>
}
