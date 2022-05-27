const Component = wp.element.Component;
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import Content from './Components/react/content';
import ITEMS from './Components/js/item';
import Default_object from './Components/js/dnd-default-settings';



const dropIt = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);

  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });

  // console.log('==> dropIt', destClone);
  return destClone;
};

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const List = styled.div`
    border: 1px ${props => (props.isDraggingOver ? 'solid #000' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
`;
const SideSection = styled(List)`
    position: absolute;
    float : left;
    top: 0;
    right: 0;
    bottom: 0;
    width: 280px;
    margin-right: 6px;
    min-height: 770px;
`;
const Item = styled.div`
    // display: flex;
    user-select: none;
    padding: 0.5rem;
    margin: 0 0 0.5rem 0;
    align-items: flex-start;
    align-content: flex-start;
    line-height: 1.5;
    border-radius: 3px;
    background: #fff;
    border: 1px ${props => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
`;



const user_data = dnd_admin_var.settings // old values
// console.log('user_data');
// console.log(user_data);

var saved_object = '';

if(user_data.length > 0){
  
  console.log('if is working..');
  saved_object = user_data[0]
}else{
   console.log('else is working..');
  saved_object = {
    ['state-id'] : [...Default_object]
  }
}


// console.log('saved_object');
// console.log(saved_object);

class App extends Component {
  state = {
        ['state-id']: [...saved_object['state-id']]
    };

  addList = e => {
        this.setState({ [uuid()]: [] });
    };

  onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        this.setState({
          [destination.droppableId]: reorder(
              this.state[source.droppableId],
              source.index,
              destination.index
            )
          });
        break;
      case 'ITEMS':
        this.setState({
          [destination.droppableId]: dropIt(
              ITEMS,
              this.state[destination.droppableId],
              source,
              destination
            )
          });
        break;
    }
  }

  settingFieldValues = (name) =>{
    let hello = name['state-id'].map((values)=> {
      let inputValue = document.getElementById(values.name).value;

      const newValue = { 'value' : inputValue, };
      const fieldValue = {
            ...values,
            ...newValue
          };
      return(fieldValue)
    });
    return hello;
  }

  saveStateData = (e) => {
    e.preventDefault();
    let stateValue = this.state
    console.log(stateValue);
    let sampleData = {
      action  : 'dnd_template',
      savedData : stateValue,
    }

    jQuery.ajax({
      type : 'POST',
      url : ajaxurl,
      data : sampleData,
      success : alert('Saved'),
    });
  }

  deleteField = object => {
    const selected_obj = object.name;
    const deleted = this.state['state-id'];
    const index = deleted.findIndex(obj => {
      return obj.name === selected_obj;
    });

    deleted.splice(index, 1);
    const newData = { ['state-id']:[...deleted] };
    this.setState({['state-id']:[...newData['state-id']]});
  }

  render(){
    return (
      <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart} >
        <Droppable droppableId="ITEMS" isDropDisabled={true}>
          {(provided, snapshot) => (
            <SideSection
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h2>Default Fields!</h2>
            
            {
              ITEMS.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                {(provided, snapshot)=>(
                  <React.Fragment>
                    <Item 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                      style={ provided.draggableProps.style}
                    > 

                      {item.content}
                    
                    </Item>
                  </React.Fragment>
                  )}
                </Draggable>
                ))
            }

              {provided.placeholder}
            </SideSection>
          )}
        </Droppable>
        <Content  
          state={this.state}  
          saveStateData={this.saveStateData}
          deleteField={this.deleteField}
        />

      </DragDropContext>
      )
  }
}

wp.element.render(<App  />, document.getElementById('react_contents'));

