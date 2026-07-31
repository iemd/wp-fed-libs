/**
 * 10. Build an Event RSVP
 */
const { useState } = React;

export function EventRSVPForm() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [attendees, setAttendees] = useState('');
    const [dietaryPreferences, setDietaryPreferences] = useState('');
    const [additionalGuests, setAdditionalGuests] = useState(false);
    
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
    }

    return (
        <div className="form-wrap">
            <h2>Event RSVP Form</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                    />
                </label>
                <label>Email:
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Your Email"
                        required
                    />
                </label>
                <label>Number of Attendees:
                    <input
                        type="number"
                        min="1"
                        value={attendees}
                        onChange={e => setAttendees(e.target.value)}
                        placeholder="Number of Attendees"
                        required
                    />
                </label>
                <label>Dietary Preferences:
                    <input
                        type="text"
                        value={dietaryPreferences}
                        onChange={e => setDietaryPreferences(e.target.value)}
                        placeholder="Dietary Preferences (Optional)"
                    />
                </label>
                <label>Bringing Additional Guests:
                    <input
                        type="checkbox"
                        value={additionalGuests}
                        onChange={() => setAdditionalGuests(true)}
                    />
                </label>
                <button type="submit">Submit RSVP</button>
            </form>
            {isSubmitted &&
                <div className="message">
                    <h3>RSVP Submitted!</h3>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Number of attendees:</strong> {attendees}</p>
                    <p><strong>Dietary preferences:</strong> {dietaryPreferences}</p>
                    <p><strong>Bringing additional guests:</strong> {additionalGuests ? "Yes" : "No"}</p>
                </div>
            }
        </div>
    );
}
