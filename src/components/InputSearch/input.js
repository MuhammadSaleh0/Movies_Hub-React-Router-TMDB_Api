import classes from "./input.module.css"


const input = (props) => {
    return <input
        spellCheck="false"
        className={`${classes.input} ${props.className}`}
        {...props.input}
        value={props.value}
        onChange={props.onChange ? (e) => props.onChange(e) : null}
    />
}

export default input;