'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
const CATS = [{id:'cafe',label:'Cafe'},{id:'resto',label:'Restaurant'},{id:'bar',label:'Bar'},{id:'club',label:'Nightlife'},{id:'parc',label:'Parc'},{id:'art',label:'Art'},{id:'shop',label:'Commerce'},{id:'autre',label:'Autre'}]
const HOODS = ['Plateau-Mont-Royal','Mile-End','Vieux-Montreal','Griffintown','Centre-Ville','Rosemont','Little Italy','Villeray','Outremont','Saint-Henri','Verdun','Hochelaga','Chinatown','Autre']
export default function Page() {
  const [name,setName]=useState('')
  const [address,setAddress]=useState('')
  const [description,setDescription]=useState('')
  const [cat,setCat]=useState('')
  const [hood,setHood]=useState('')
  const [sname,setSname]=useState('')
  const [email,setEmail]=useState('')
  const [loading,setLoading]=useState(false)
  const [ok,setOk]=useState(false)
  const [err,setErr]=useState('')
  const submit=async()=>{
    setErr('')
    if(!name||!address||!description||!cat||!hood||!sname||!email){setErr('Remplis tous les champs.');return}
    setLoading(true)
    const{error:e}=await supabase.from('spots').insert([{name,address,description,category:cat,neighborhood:hood,submitter_name:sname,submitter_email:email,status:'pending',city_id:'montreal'}])
    setLoading(false)
    if(e){setErr(e.message);return}
    setOk(true)
  }
  if(ok)return <div style={{background:'#0a0a0a',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'#f0ede8',fontFamily:'sans-serif',textAlign:'center'}}><div><div style={{fontSize:52}}>🎉</div><h2 style={{fontSize:32,marginBottom:12}}>Spot soumis!</h2><p style={{color:'rgba(240,237,232,0.5)',marginBottom:24}}>On verifie sous 48h!</p><button onClick={()=>setOk(false)} style={{padding:'12px 28px',background:'#4a9eff',color:'#000',border:'none',borderRadius:12,cursor:'pointer',fontWeight:700}}>Autre spot</button></div></div>
  const I:React.CSSProperties={width:'100%',background:'#171717',border:'1px solid rgba(255,255,255,0.1)',borderRadius:10,padding:'11px 14px',fontSize:13,color:'#f0ede8',fontFamily:'inherit',outline:'none',marginBottom:16,boxSizing:'border-box'}
  const L:React.CSSProperties={fontSize:12,color:'rgba(240,237,232,0.6)',display:'block',marginBottom:6,fontWeight:500}
  return(
    <div style={{background:'#0a0a0a',minHeight:'100vh',color:'#f0ede8',fontFamily:'sans-serif'}}>
      <nav style={{display:'flex',justifyContent:'space-between',padding:'16px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
        <span style={{fontWeight:800,letterSpacing:2,fontSize:18}}>MTL<span style={{color:'#4a9eff'}}>pulse</span></span>
        <span style={{color:'rgba(240,237,232,0.4)',fontSize:13}}>Retour</span>
      </nav>
      <div style={{maxWidth:560,margin:'0 auto',padding:'48px 24px'}}>
        <h2 style={{fontSize:30,fontWeight:900,marginBottom:6}}>Submit a <span style={{color:'#4a9eff'}}>Spot</span></h2>
        <p style={{fontSize:13,color:'rgba(240,237,232,0.4)',marginBottom:32}}>Champs * requis</p>
        {err&&<div style={{background:'rgba(255,92,92,0.1)',border:'1px solid rgba(255,92,92,0.3)',borderRadius:10,padding:'12px',color:'#ff8080',marginBottom:16,fontSize:13}}>{err}</div>}
        <label style={L}>Nom du spot *</label>
        <input style={I} placeholder="ex: Cafe Olimpico" value={name} onChange={e=>setName(e.target.value)}/>
        <label style={L}>Adresse *</label>
        <input style={I} placeholder="ex: 124 Rue Saint-Viateur O" value={address} onChange={e=>setAddress(e.target.value)}/>
        <label style={{...L,marginBottom:12}}>Categorie *</label>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:20}}>
          {CATS.map(c=><button key={c.id} onClick={()=>setCat(c.id)} style={{padding:'10px 6px',background:cat===c.id?'rgba(74,158,255,0.15)':'#171717',border:cat===c.id?'1px solid #4a9eff':'1px solid rgba(255,255,255,0.08)',borderRadius:10,cursor:'pointer',color:cat===c.id?'#4a9eff':'rgba(240,237,232,0.5)',fontSize:12,fontFamily:'inherit'}}>{c.label}</button>)}
        </div>
        <label style={{...L,marginBottom:12}}>Quartier *</label>
        <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:20}}>
          {HOODS.map(h=><button key={h} onClick={()=>setHood(h)} style={{fontSize:11,padding:'5px 12px',borderRadius:20,border:hood===h?'1px solid #4a9eff':'1px solid rgba(255,255,255,0.1)',background:hood===h?'rgba(74,158,255,0.1)':'transparent',color:hood===h?'#4a9eff':'rgba(240,237,232,0.45)',cursor:'pointer',fontFamily:'inherit'}}>{h}</button>)}
        </div>
        <label style={L}>Description *</label>
        <textarea style={{...I,height:90,resize:'none'}} placeholder="Pourquoi cet endroit est special?" value={description} onChange={e=>setDescription(e.target.value)}/>
        <label style={L}>Ton prenom *</label>
        <input style={I} placeholder="Sophie" value={sname} onChange={e=>setSname(e.target.value)}/>
        <label style={L}>Email *</label>
        <input style={{...I,marginBottom:28}} type="email" placeholder="ton@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
        <button onClick={submit} disabled={loading} style={{width:'100%',padding:14,background:'#4a9eff',color:'#000',border:'none',borderRadius:12,fontSize:14,fontWeight:700,cursor:'pointer',opacity:loading?0.6:1}}>{loading?'Envoi...':'Soumettre le spot'}</button>
      </div>
    </div>
  )
}
