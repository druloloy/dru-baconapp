export default function BanksContainer(props){  
    return (
        <div className="container-boilerplate colored-container-red">
            <div>
                <p className="p-list bold">{props.name}</p>
                <p className="p-list">Created: {props.date}</p>
            </div>
            <div>
                <button style={delButton} onClick={()=>props.removeBank(props.name, props.amount, props.id)}>{props.icon}</button>
            </div>
        </div>
    )
}

const delButton = {
    background: "none",
    border: "none",
    height: "100%",
    color: "ff6961",
    fontSize: "2rem",
}