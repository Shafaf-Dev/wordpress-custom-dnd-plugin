import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Input from './input-field';

const List = styled.div`
    border: 1px ${props => (props.isDraggingOver ? 'dashed #000' : 'solid #ddd')};
    background: #fff;
    padding: 0.5rem 0.5rem 0;
    border-radius: 3px;
    flex: 0 0 150px;
    font-family: sans-serif;
`;
const Container = styled(List)`
    margin: 0.5rem 8.5rem 1.5rem 1.5rem;
    background: #e5edf1;
    width: 56rem;
`;
const Item = styled.div`
    // display: flex;
    user-select: none;
    padding: 0.5rem;
    margin: 0 0 0.5rem 0;
    align-items: flex-start;
    align-content: flex-start;
    line-height: 1.5;
    border-radius: 6px;
    background: #fff;
    border: 1px ${props => (props.isDragging ? 'dashed #4099ff' : 'solid #ddd')};
`;
const ItemField = styled.label`
    float: left;
    font-size: initial;
`;
const Content = (props) => {
	return(
		<div className='thdnd-builder-area'>
			<form method='POST' className='ajax'>
				{
					Object.keys(props.state).map((list, i)=>{
						return(
							<Droppable key={list} droppableId={list}>
								{
									(provided, snapshot) =>(
										<Container 
										  className='builder-container'
				                          ref={provided.innerRef}
				                          isDraggingOver={ snapshot.isDraggingOver }
				                        >
				                        {props.state[list].length ? props.state[list].map( (item, index) => (
				                            <Draggable
				                              key={item.id}
				                              draggableId={item.id}
				                              index={index}
				                            >
				                              {(provided, snapshot) => (
				                                <Item
				                                  className='form-field-item'
				                                  ref={provided.innerRef}
				                                  {...provided.draggableProps}
				                                  isDragging={ snapshot.isDragging }
				                                  style={ provided.draggableProps.style}
				                                  {...provided.dragHandleProps}
				                                >
				                                  	<ItemField>
				                                      {item.title}
			                                    	</ItemField>
			                                    	<span id={item.id} onClick={() => props.deleteField(item)} className="dashicons dashicons-trash delete-button"></span>
				                                      <Input
				                                        type={item.type}
				                                        name={item.name} 
				                                        id={item.name} 
				                                        placeholder={item.content} 
				                                        item={item}
				                                      />

				                                </Item>

				                                )}
				                            </Draggable>
				                            )
				                          )
				                            : !provided.placeholder && (
				                              <Notice>
				                                Drop items here
				                              </Notice>
				                              )}
				                            {provided.placeholder}
				                        </Container>
										)
								}
							 </Droppable>
							)
					})
				}

		 		<button onClick={props.saveStateData} className='submit-button'> Submit </button>
          	</form>
		</div>
		);
}

export default Content