const SelectionDisplay = (props: any) => {
  //Selected product id will show here.
  return (
    <div className="selection">
      <p>Selection:</p> <p>{props.selected}</p>
    </div>
  );
};

export default SelectionDisplay;
