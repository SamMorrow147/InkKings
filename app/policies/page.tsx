import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Policies | Ink Kings Tattoo",
  description:
    "Deposit, cancellation, and scheduling policies for Ink Kings Tattoo in Otsego, MN. Please review before booking your appointment.",
};

const policies = [
  {
    body: "A NON REFUNDABLE deposit is required in order to hold your appointment date.",
  },
  {
    body: "Deposit amounts are based on the artist's hourly rate and are equivalent to one (1) hour of tattoo time.",
  },
  {
    body: "Deposits must be paid within 24 hours of booking or your appointment will not be guaranteed.",
  },
  {
    body: "The deposit is NON REFUNDABLE once you place it. If you no call no show, cancel, or completely change your mind and no longer wish to have the tattoo done, you will forfeit the deposit.",
  },
  {
    body: "You will receive a text reminder three (3) days prior to the appointment. If you need to reschedule at that time, your deposit will move with the reschedule.",
  },
  {
    body: "We are closed on Sundays — please plan accordingly.",
  },
  {
    body: "You will need to reschedule your appointment prior to two business days in order to keep your deposit.",
  },
  {
    body: "We will allow up to three (3) reschedules per date. After three reschedules, a new deposit will be required.",
  },
  {
    body: "If you cancel or need to reschedule within two business days, a new deposit must be placed prior to scheduling.",
  },
  {
    body: "\"I forgot to take off work\" or \"My babysitter canceled\" are not emergencies and will require a new deposit in order to be rescheduled. Our artists put in time prior to your appointment to prepare, and it is not fair to them to cancel last minute as they will be unable to fill that time slot with another client.",
  },
  {
    body: "We understand that genuine emergencies do come up. In those cases, it will be up to the individual artist regarding your deposit.",
  },
  {
    body: "Deposits are with individual artists and not the shop itself.",
  },
  {
    body: "In order to ensure that we are able to serve all of our clients in a timely manner, we ask that you arrive on time for your appointment.",
  },
  {
    body: "If you are more than 15 minutes late, we reserve the right to reschedule your appointment and require a new non-refundable deposit in order to reschedule and/or keep any future appointments already booked.",
  },
];

const dividerStyle: React.CSSProperties = {
  borderTop: "1px solid rgba(191,132,26,0.12)",
  margin: "0",
};

export default function PoliciesPage() {
  return (
    <main
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "#f5f5f5",
        fontFamily: '"trajan-pro-3", serif',
      }}
    >
      {/* Back nav */}
      <div className="px-6 py-6">
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            fontSize: "0.8rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
          }}
        >
          ← Back
        </Link>
      </div>

      {/* Header */}
      <section
        style={{
          textAlign: "center",
          padding: "1rem 1.5rem 3.5rem",
          maxWidth: 760,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <p
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "1.25rem",
          }}
        >
          Ink Kings Tattoo
        </p>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 600,
            letterSpacing: "0.05em",
            margin: "0 0 1.5rem",
          }}
        >
          Reschedule, Cancellation &amp; Deposit Policies
        </h1>
        <p
          style={{
            fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
            fontWeight: 300,
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.55)",
            maxWidth: 580,
            margin: "0 auto",
          }}
        >
          Please review our policies before booking. If you have any questions, don&apos;t hesitate to reach out to the front desk.
        </p>
      </section>

      {/* Policy list */}
      <section
        style={{
          maxWidth: 760,
          margin: "0 auto",
          padding: "0 1.5rem 6rem",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(191,132,26,0.15)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {policies.map((policy, i) => (
            <div key={i}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.5rem 1fr",
                  gap: "1rem",
                  alignItems: "start",
                  padding: "1.5rem 1.75rem",
                }}
              >
                {/* Number */}
                <span
                  style={{
                    fontFamily: '"trajan-pro-3", serif',
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    color: "rgba(191,132,26,0.6)",
                    paddingTop: "0.2rem",
                    textAlign: "right",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Body */}
                <p
                  style={{
                    fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
                    fontWeight: 300,
                    fontSize: "clamp(0.88rem, 2vw, 1rem)",
                    lineHeight: 1.85,
                    color: "rgba(255,255,255,0.75)",
                    margin: 0,
                  }}
                >
                  {policy.body}
                </p>
              </div>
              {i < policies.length - 1 && <div style={dividerStyle} />}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          style={{
            fontFamily: '"myriad-pro", "Helvetica Neue", Arial, sans-serif',
            fontWeight: 300,
            fontSize: "0.875rem",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.35)",
            textAlign: "center",
            marginTop: "2.5rem",
          }}
        >
          We appreciate your understanding and cooperation. Questions? Reach out to the front desk anytime.
        </p>
      </section>
    </main>
  );
}
