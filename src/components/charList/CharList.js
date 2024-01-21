import './charList.scss';
import React from 'react';
import MarvelServices from "../../services/MarvelServices"
import Spinner from '../spinner/Spinner';

class CharList extends React.Component {
    state = {
        massChar: [],
        loading: true,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }
    marvelServ = new MarvelServices()

    componentDidMount() {
        this.onRequest()
    }
    onCharLoaded = (newMassChar) => {
        let ended = false;
        if (newMassChar.length < 9) {
            ended = true;
        }

        this.setState(({offset,massChar}) => ({     
                massChar: [...massChar, ...newMassChar], 
                loading: false,
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended
        }))
    }
    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelServ.getAllCharacters(offset)
        .then(this.onCharLoaded)
    }
    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }
    render () {
        const {offset,newItemLoading, charEnded} = this.state
        const {onCharSelected} = this.props
        const elem = this.state.massChar.map(item => {
            return <Viev massChar={item} onCharSelected={onCharSelected} />
        })
        return (
            <div className="char__list">
                <ul className="char__grid">
                  {this.state.loading ? <Spinner /> : elem}   
                </ul>
                <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{"display": charEnded ? "none": "block"}}
                onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}


const Viev = ({massChar, onCharSelected}) => {
    return (
        <li 
            className="char__item" 
            key={massChar.id}
            onClick={() => onCharSelected(massChar.id)}>
                <img src={massChar.thumbnail} alt="abyss"/>
                <div className="char__name">{massChar.name}</div>
        </li>
    )
}

export default CharList;