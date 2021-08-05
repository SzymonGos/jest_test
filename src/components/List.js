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
        if (inputEl.current.value === '') return;
        dispatch({
            type: "ADD",
            name: inputEl.current.value
        })
        inputEl.current.value = '';
    }
    console.log(notes);
    return (
        <>
            <header className="header">
                <input
                    className='input'
                    ref={inputEl}
                    placeholder='Add note' />
                <button
                    type='button'
                    className='btn'
                    onClick={addNote}
                >
                    Add note</button>
                <div className='notes'>
                    {notes.map((note) => (
                        <div
                            key={note.id}
                            className='notes__item'
                        >
                            <p>{note.name}</p>
                            <AiFillCloseCircle 
                            className='btn-close'
                            onClick={()=> dispatch({ type: 'REMOVE', id: note.id})}
                            />
                        </div>

                    ))}
                </div>
            </header>
        </>
    );
}

export default List;