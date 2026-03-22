import { useState } from 'react'
import toast from 'react-hot-toast'
import { IconX, IconClock, IconClosed, IconCheck, IconUsers, IconCalendar, IconPhone } from './Icons.jsx'
import styles from './BookingModal.module.css'
import { useLang } from '../i18n/LanguageContext.jsx'

const apiBookingUrl = () =>
  (import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '') : '') + '/api/booking'

export default function BookingModal({ open, onClose }) {
  const { lang } = useLang()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    notes: '',
  })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const errT =
    lang === 'en'
      ? {
          emailNotConfigured:
            'Booking email is not configured on the server yet. Please call us to reserve.',
          sendFailed: 'Could not send your reservation. Please try again or call us.',
          network: 'Network error. Please check your connection or call us.',
          sending: 'Sending…',
        }
      : {
          emailNotConfigured:
            "L'invio email non è ancora configurato sul server. Chiamaci per prenotare.",
          sendFailed: 'Impossibile inviare la prenotazione. Riprova o chiamaci.',
          network: 'Errore di rete. Controlla la connessione o chiamaci.',
          sending: 'Invio in corso…',
        }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(apiBookingUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          date: form.date,
          time: form.time,
          guests: form.guests,
          notes: form.notes,
          lang,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        const detail =
          typeof data.message === 'string' && data.message.trim()
            ? data.message.trim().slice(0, 220)
            : ''
        const msg =
          data.error === 'Email not configured'
            ? errT.emailNotConfigured
            : detail
              ? `${errT.sendFailed} ${detail}`
              : errT.sendFailed
        toast.error(msg)
        return
      }
      setSent(true)
      setTimeout(() => {
        onClose()
        setSent(false)
        setStep(1)
        setForm({ name: '', phone: '', email: '', date: '', time: '', guests: '2', notes: '' })
      }, 3000)
    } catch {
      toast.error(errT.network)
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    onClose()
    setStep(1)
    setSent(false)
    setSubmitting(false)
  }

  if (!open) return null

  const t = lang === 'en'
    ? {
        modalEyebrow: 'Las Vegas · Restaurant Pizzeria',
        modalTitle: 'Book a Table',
        closeAria: 'Close',
        steps: ['Personal details', 'Date & time', 'Confirmation'],
        successTitle: 'Reservation received!',
        successNote: 'See you soon at Las Vegas!',
        nameLabel: 'First and last name *',
        namePlaceholder: 'Mario Rossi',
        phoneLabel: 'Phone *',
        phonePlaceholder: '+39 347 0141184',
        emailLabel: 'Email',
        emailPlaceholder: 'mario@email.com',
        guestsLabel: 'Number of guests *',
        next: 'Continue →',
        back: '← Back',
        dateLabel: 'Date *',
        timeLabel: 'Time *',
        selectTime: 'Select a time',
        lunchGroup: 'Lunch (only Sunday)',
        dinnerGroup: 'Dinner',
        notesLabel: 'Special notes',
        notesPlaceholder: 'Allergies, special occasions, special requests...',
        hoursReminder1: 'Mon–Sat: 19:00–24:00 · Sun: 12:00–24:00',
        hoursReminder2: 'Closed on Tuesday',
        summaryTitle: 'Reservation summary',
        summaryName: 'Name',
        summaryPhone: 'Phone',
        summaryGuests: 'Guests',
        summaryDate: 'Date',
        summaryTime: 'Time',
        summaryNoteLabel: 'Notes',
        summaryNote: 'We will contact you at your number to confirm the reservation. Alternatively, call us directly at',
        submit: '✓ Confirm reservation',
      }
    : {
        modalEyebrow: 'Las Vegas · Ristorante Pizzeria',
        modalTitle: 'Prenota un Tavolo',
        closeAria: 'Chiudi',
        steps: ['Dati personali', 'Data & orario', 'Conferma'],
        successTitle: 'Prenotazione ricevuta!',
        successNote: 'A presto al Las Vegas!',
        nameLabel: 'Nome e Cognome *',
        namePlaceholder: 'Mario Rossi',
        phoneLabel: 'Telefono *',
        phonePlaceholder: '+39 347 0141184',
        emailLabel: 'Email',
        emailPlaceholder: 'mario@email.it',
        guestsLabel: 'Numero di persone *',
        next: 'Continua →',
        back: '← Indietro',
        dateLabel: 'Data *',
        timeLabel: 'Orario *',
        selectTime: 'Seleziona orario',
        lunchGroup: 'Pranzo (solo domenica)',
        dinnerGroup: 'Cena',
        notesLabel: 'Note speciali',
        notesPlaceholder: 'Allergie, occasioni speciali, richieste particolari...',
        hoursReminder1: 'Lun–Sab: 19:00–24:00 · Dom: 12:00–24:00',
        hoursReminder2: 'Chiuso il Martedì',
        summaryTitle: 'Riepilogo prenotazione',
        summaryName: 'Nome',
        summaryPhone: 'Telefono',
        summaryGuests: 'Persone',
        summaryDate: 'Data',
        summaryTime: 'Orario',
        summaryNoteLabel: 'Note',
        summaryNote: 'Ti contatteremo al tuo numero per confermare la prenotazione. In alternativa, chiama direttamente al',
        submit: '✓ Conferma Prenotazione',
      }

  const summaryRows = [
    { label: t.summaryName, val: form.name },
    { label: t.summaryPhone, val: form.phone },
    ...(form.email ? [{ label: t.emailLabel, val: form.email }] : []),
    { label: t.summaryGuests, val: form.guests },
    { label: t.summaryDate, val: form.date },
    { label: t.summaryTime, val: form.time },
    ...(form.notes ? [{ label: t.summaryNoteLabel, val: form.notes }] : []),
  ]

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerTop}>
            <div>
              <div className={styles.modalEyebrow}>{t.modalEyebrow}</div>
              <h2 className={styles.modalTitle}>{t.modalTitle}</h2>
            </div>
            <button className={styles.closeBtn} onClick={handleClose} aria-label={t.closeAria}>
              <IconX size={16} />
            </button>
          </div>
          {!sent && (
            <div className={styles.steps}>
              {t.steps.map((s, i) => (
                <div key={s} className={`${styles.step} ${step > i + 1 ? styles.stepDone : ''} ${step === i + 1 ? styles.stepActive : ''}`}>
                  <div className={styles.stepDot}>{step > i + 1 ? <IconCheck size={14} /> : i + 1}</div>
                  <div className={styles.stepLabel}>{s}</div>
                  {i < 2 && <div className={styles.stepLine} />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {sent ? (
            <div className={styles.success}>
              <div className={styles.successIcon}><IconCheck size={40} /></div>
              <div className={styles.successTitle}>{t.successTitle}</div>
              <div className={styles.successSub}>
                {lang === 'en' ? (
                  <>
                    Dear {form.name}, your reservation for {form.guests} guests on {form.date} at {form.time} has been received.
                    We will contact you at {form.phone} to confirm.
                  </>
                ) : (
                  <>
                    Caro {form.name}, la tua prenotazione per {form.guests} persone il {form.date} alle {form.time} è stata ricevuta.
                    Ti contatteremo al {form.phone} per confermare.
                  </>
                )}
              </div>
              <div className={styles.successNote}>{t.successNote}</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className={styles.formStep}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t.nameLabel}</label>
                      <input
                        className={styles.input}
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder={t.namePlaceholder}
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.formRow2}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t.phoneLabel}</label>
                      <input
                        className={styles.input}
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder={t.phonePlaceholder}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t.emailLabel}</label>
                      <input
                        className={styles.input}
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder={t.emailPlaceholder}
                        type="email"
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>{t.guestsLabel}</label>
                    <div className={styles.guestPicker}>
                      {['1', '2', '3', '4', '5', '6', '7', '8+'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          className={`${styles.guestBtn} ${form.guests === g ? styles.guestBtnActive : ''}`}
                          onClick={() => setForm({ ...form, guests: g })}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.nextBtn}
                    onClick={() => form.name && form.phone && setStep(2)}
                    disabled={!form.name || !form.phone}
                  >
                    {t.next}
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className={styles.formStep}>
                  <div className={styles.formRow2}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t.dateLabel}</label>
                      <input
                        className={styles.input}
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>{t.timeLabel}</label>
                      <select className={styles.input} name="time" value={form.time} onChange={handleChange} required>
                        <option value="">{t.selectTime}</option>
                        <optgroup label={t.lunchGroup}>
                          {['12:00', '12:30', '13:00', '13:30', '14:00'].map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </optgroup>
                        <optgroup label={t.dinnerGroup}>
                          {['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'].map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </optgroup>
                      </select>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>{t.notesLabel}</label>
                    <textarea
                      className={`${styles.input} ${styles.textarea}`}
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder={t.notesPlaceholder}
                      rows={3}
                    />
                  </div>

                  {/* Hours reminder */}
                  <div className={styles.hoursReminder}>
                    <div className={styles.hoursItem}>
                      <IconClock size={15} />
                      <span>{t.hoursReminder1}</span>
                    </div>
                    <div className={styles.hoursItem}>
                      <IconClosed size={15} />
                      <span>{t.hoursReminder2}</span>
                    </div>
                  </div>

                  <div className={styles.formRow2}>
                    <button type="button" className={styles.backBtn} onClick={() => setStep(1)}>{t.back}</button>
                    <button
                      type="button"
                      className={styles.nextBtn}
                      onClick={() => form.date && form.time && setStep(3)}
                      disabled={!form.date || !form.time}
                    >
                      {t.next}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className={styles.formStep}>
                  <div className={styles.summary}>
                    <div className={styles.summaryTitle}>{t.summaryTitle}</div>
                    <div className={styles.summaryGrid}>
                      {summaryRows.map(r => (
                        <div key={r.label} className={styles.summaryRow}>
                          <span className={styles.summaryLabel}>{r.label}</span>
                          <span className={styles.summaryVal}>{r.val}</span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.summaryNote}>
                      {t.summaryNote} <a href="tel:+390071912980">071 912980</a>.
                    </div>
                  </div>
                  <div className={styles.formRow2}>
                    <button type="button" className={styles.backBtn} onClick={() => setStep(2)}>{t.back}</button>
                    <button type="submit" className={styles.submitBtn} disabled={submitting}>
                      {submitting ? errT.sending : t.submit}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
