export const MessageItem = ({type, message}: {type: Number, message: string}) => {
  return (
    <div className={ `item item${type}` }>
      <p>{ message }</p>
      <button
        className="clear-button">Clear</button>
    </div>
  )
};
