/**
 * 4. Build a Mood Board
 */
export const MoodBoardItem = ({ color, image, description }) => {
    return (
        <div className="mood-board-item" style={{ backgroundColor: color }}>
            <img className="mood-board-image" src={image} />
            <h3 className="mood-board-text">{description}</h3>
        </div>
    );
}

export const MoodBoard = () => {
    const destinations = [
        {
            id: 1,
            color: "#007dcc",
            image: "https://cdn.freecodecamp.org/curriculum/labs/pathway.jpg",
            description: "Caribbean"
        },
        {
            id: 2,
            color: "#ffb900",
            image: "https://cdn.freecodecamp.org/curriculum/labs/shore.jpg",
            description: "Gawadar Beach"
        },
        {
            id: 3,
            color: "#d10056",
            image: "https://cdn.freecodecamp.org/curriculum/labs/grass.jpg",
            description: "Cape Town"
        },
        {
            id: 4,
            color: "#063b00",
            image: "https://cdn.freecodecamp.org/curriculum/labs/ship.jpg",
            description: "Suez Canal"
        },
        {
            id: 5,
            color: "#0f3040",
            image: "https://cdn.freecodecamp.org/curriculum/labs/santorini.jpg",
            description: "Santorini"
        },
        {
            id: 6,
            color: "#60241e",
            image: "https://cdn.freecodecamp.org/curriculum/labs/pigeon.jpg",
            description: "Istanbul"
        }
    ];
    return (
        <div className="mood-board">
            <h1 className="mood-board-heading">Destination Mood Board</h1>
            {destinations.map((destination) => (
                <MoodBoardItem
                    key={destination.id}
                    color={destination.color}
                    image={destination.image}
                    description={destination.description}
                />
            ))}
        </div>
    );
}
