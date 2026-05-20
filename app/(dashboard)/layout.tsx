'use client'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const navItems = [
    {
      label: 'Pasien', path: '/patients',
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
    },
    {
      label: 'Konsultasi', path: '/consult',
      icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="1.8"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
    },
  ]

  const initials = session?.user?.name
    ? session.user.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : 'DR'

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-base)' }}>
      {/* Sidebar */}
      <aside style={{
        width: '230px', minHeight: '100vh',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        padding: '0', position: 'fixed', top: 0, left: 0, zIndex: 10,
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Logo area */}
        <div style={{
          padding: '24px 20px 20px',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: '0 4px 12px var(--accent-soft)'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="white" opacity=".9"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                <path d="M12 19v3M9 22h6" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: "'Libre Baskerville', serif" }}>
                MediScribe
              </div>
              <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 500, letterSpacing: '0.05em' }}>AI</div>
            </div>
          </div>
        </div>

        {/* Nav section */}
        <div style={{ padding: '16px 12px', flex: 1 }}>
          <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-hint)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 8px', marginBottom: '8px' }}>
            Menu
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {navItems.map(item => {
              const isActive = pathname.startsWith(item.path)
              return (
                <button key={item.path} onClick={() => router.push(item.path)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '9px 12px', borderRadius: 'var(--radius-sm)',
                    background: isActive ? 'var(--accent-soft)' : 'transparent',
                    border: isActive ? '1px solid #ffed6140' : '1px solid transparent',
                    color: isActive ? 'var(--accent-text)' : 'var(--text-secondary)',
                    cursor: 'pointer', fontSize: '14px', fontWeight: isActive ? 600 : 400,
                    transition: 'all .15s', textAlign: 'left', width: '100%'
                  }}
                  onMouseEnter={e => { if (!isActive) { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'var(--bg-elevated)'; b.style.color = 'var(--text-primary)' }}}
                  onMouseLeave={e => { if (!isActive) { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'transparent'; b.style.color = 'var(--text-secondary)' }}}
                >
                  <span style={{ opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* User + logout */}
        <div style={{ padding: '12px', borderTop: '1px solid var(--border-light)' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '10px 12px', borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-elevated)', marginBottom: '4px'
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), var(--warm))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: 600, color: 'var(--accent-text)', flexShrink: 0
            }}>
              {initials}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {session?.user?.name || 'Dokter'}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {session?.user?.email}
              </div>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/login' })} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 12px', borderRadius: 'var(--radius-sm)',
            background: 'transparent', border: 'none',
            color: 'var(--text-muted)', cursor: 'pointer',
            fontSize: '13px', transition: 'all .15s', width: '100%'
          }}
          onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.color = 'var(--danger)'; b.style.background = 'var(--danger-soft)' }}
          onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.color = 'var(--text-muted)'; b.style.background = 'transparent' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Keluar
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: '230px', flex: 1, padding: '36px 40px', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  )
}