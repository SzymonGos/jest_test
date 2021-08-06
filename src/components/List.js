import { useRef, useReducer } from "react";
import { nanoid } from "nanoid";
import { AiFillCloseCircle } from 'react-icons/ai';

const List = () => {

    const [notes, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'ADD': {
                return [...state,
                {
                    id: nanoid(),
                    name: action.name
                }
                ]
            }
            case 'REMOVE': {
                return state.filter((note) => note.id !== action.id)
            }
            default:
                return state;
        }
    }, [])

    const inputEl = useRef(null);

    const addNote = () => {
        if (inputEl.current.value.trim() === '') return;
        dispatch({
            type: "ADD",
            name: inputEl.current.value
        })
        inputEl.current.value = '';
    }
    
    return (
        <>
            <header className="header">
                <input
                    className='input'
                    ref={inputEl}
                    placeholder='New note'
                    data-testid="input-field" />
                <button
                    type='button'
                    className='btn'
                    onClick={addNote}
                    data-testid="add-button"
                >
                    Add note</button>
                <div className='notes'>
                <h4 
                style={{textTransform:'lowercase'}}
                data-testid="countNotes"
                >{notes.length} note(s)</h4>
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className='notes__item'
                            data-testid='note'
                        >
                            <p>{note.name}</p>
                            <AiFillCloseCircle 
                            className='btn-close'
                            onClick={()=> dispatch({ type: 'REMOVE', id: note.id})}
                            data-testid='delete-button'
                            />
                        </div>

                    ))}
                </div>
            </header>
        </>
    );
}

export default List;