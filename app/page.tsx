'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const CATS = [{id:'cafe',label:'☕ Cafe'},{id:'resto',label:'🍽️ Restaurant'},{id:'bar',label:'🍺 Bar'},{id:'club',label:'🎵 Nightlife'},{id:'parc',label:'🌿 Parc'},{id:'art',label:'🎨 Art'},{id:'shop',label:'🛍️ Commerce'},{id:'autre',label:'✨ Autre'}]

export default function Page() {
  const [spots, setSpots] = useState<any[]>([])
  const [cat, setCat] = useState('')
  const [hood, setHood] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSpots()
  }, [cat, hood])

  const fetchSpots = async () => {
    setLoading(true)
    let q = supabase.from('spots').select('*').eq('status', 'approved').order('created_at', {ascending: false})
    if (cat) q = q.eq('category', cat)
    if (hood) q = q.eq('neighborhood', hood)
    const { data } = await q
    setSpots(data || [])
    setLoading(false)
  }

  return (
    <div style={{background:'#0a0a0a',minHeight:'100vh',color:'#f0ede8',fontFamily:'sans-serif'}}>
      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 40px',borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
        <span style={{fontWeight:800,letterSpacing:2,fontSize:18}}>MTL<span style={{color:'#4a9eff'}}>pulse</span></span>
        <a href="/submit" style={{fontSize:13,background:'#4a9eff',color:'#000',padding:'8px 18px',borderRadius:10,textDecoration:'none',fontWeight:700}}>+ Soumettre</a>
      </nav>

      <div style={{maxWidth:900,margin:'0 auto',padding:'48px 24px'}}>
        <h1 style={{fontSize:42,fontWeight:900,marginBottom:8}}>Les meilleurs spots<br/><span style={{color:'#4a9eff'}}>de Montréal</span></h1>
        <p style={{color:'rgba(240,237,232,0.4)',marginBottom:36,fontSize:14}}>Découverts par la communauté</p>

        <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:32}}>
          <button onClick={()=>setCat('')} style={{fontSize:12,padding:'6px 14px',borderRadius:20,border:cat===''?'1px solid #4a9eff':'1px solid rgba(255,255,255,0.1)',background:cat===''?'rgba(74,158,255,0.1)':'transparent',color:cat===''?'#4a9eff':'rgba(240,237,232,0.5)',cursor:'pointer',fontFamily:'inherit'}}>Tous</button>
          {CATS.map(c=>(
            <button key={c.id} onClick={()=>setCat(cat===c.id?'':c.id)} style={{fontSize:12,padding:'6px 14px',borderRadius:20,border:cat===c.id?'1px solid #4a9eff':'1px solid rgba(255,255,255,0.1)',background:cat===c.id?'rgba(74,158,255,0.1)':'transparent',color:cat===c.id?'#4a9eff':'rgba(240,237,232,0.5)',cursor:'pointer',fontFamily:'inherit'}}>{c.label}</button>
          ))}
        </div>

        {loading ? (
          <div style={{textAlign:'center',padding:80,color:'rgba(240,237,232,0.3)'}}>Chargement...</div>
        ) : spots.length === 0 ? (
          <div style={{textAlign:'center',padding:80,color:'rgba(240,237,232,0.3)'}}>
            <div style={{fontSize:40,marginBottom:16}}>🏙️</div>
            <p>Aucun spot pour l'instant</p>
            <a href="/submit" style={{color:'#4a9eff',fontSize:13}}>Sois le premier à en soumettre un!</a>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:16}}>
            {spots.map(s=>(
              <div key={s.id} style={{background:'#111',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:20}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:8}}>
                  <h3 style={{fontSize:16,fontWeight:700,margin:0}}>{s.name}</h3>
                  <span style={{fontSize:11,background:'rgba(74,158,255,0.1)',color:'#4a9eff',padding:'3px 8px',borderRadius:20,whiteSpace:'nowrap'}}>{s.category}</span>
                </div>
                <p style={{fontSize:12,color:'rgba(240,237,232,0.4)',marginBottom:8}}>{s.neighborhood} · {s.address}</p>
                <p style={{fontSize:13,color:'rgba(240,237,232,0.7)',lineHeight:1.5,margin:0}}>{s.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}