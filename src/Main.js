import {React, useState} from "react"

export default function Main() {
    const [currentComponent, changeView] = useState("select");

    function selectComponent() {
        switch(currentComponent) {
            case "select": return <div>Select screen</div>;
            case "compass": return <div>Compass View</div>;

            default: return <div>No component found</div>;
        }
    }

    return (
        <div>
            { selectComponent() }
        </div>
    )
}