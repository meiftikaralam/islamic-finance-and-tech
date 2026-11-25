/** Upcoming events page: Islamic finance and Muslim business events in the USA.
    Data lives in content/events.json and is refreshed by the weekly events job.
    Past events drop out automatically; only future dates are shown. */

import eventsData from "../../../content/events.json";

type EventItem = {
  name: string;
  organizer: string;
  start: string;
  end: string;
  dates_display: string;
  city: string;
  venue: string;
  price: string;
  description: string;
  register_url: string;
};

const today = new Date().toISOString().slice(0, 10);

export function Events() {
  const upcoming = (eventsData.events as EventItem[])
    .filter((e) => e.end >= today)
    .sort((a, b) => a.start.localeCompare(b.start));

  return (
    <article className="prose-blog">
      <h1>Upcoming events</h1>
      <p>
        Islamic finance and Muslim business events in the USA, with links to
        register. Dates and ticket prices come from the organisers' own pages.
      </p>

      {upcoming.length === 0 ? (
        <p>
          No events are listed right now. The list is checked every week, so
          check back soon.
        </p>
      ) : (
        upcoming.map((e) => (
          <section key={e.name} className="mb-8">
            <h2>{e.name}</h2>
            <p>
              <strong>{e.dates_display}</strong> · {e.city} · {e.venue}
            </p>
            <p>{e.description}</p>
            <p>
              Organiser: {e.organizer}. {e.price}.{" "}
              <a href={e.register_url} target="_blank" rel="noopener noreferrer">
                Register on the organiser's site
              </a>
              .
            </p>
          </section>
        ))
      )}

      <h2>Dates to watch</h2>
      <p>
        These annual events have not announced their next dates yet: the ISNA
        Annual Convention (last held September 4–7, 2026, in Detroit), the IFN
        Investor Americas Forum (last held June 16, 2026, in New York), the
        North American Conference on Islamic Finance (last held October 16–18,
        2026, in Lake Forest, Illinois), the Thrive Summit (last held October
        3–4, 2025, in Dallas) and the Muslim Economy Summit (last held
        November 14, 2026, in Newark, New Jersey). They are added here as soon
        as the organisers announce dates.
      </p>

      <p>
        Know of an event that belongs here? Email{" "}
        <a href="mailto:iftikar@islamicfintech.org">iftikar@islamicfintech.org</a>.
        Listings were last checked {eventsData.last_checked}.
      </p>
    </article>
  );
}
