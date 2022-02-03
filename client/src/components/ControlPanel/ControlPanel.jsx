import { useLayoutEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  faAngleDoubleDown,
  faEdit,
  faMinusCircle,
  faPlusCircle,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { setControlPanelHeight } from '../../redux/layoutSlice';

import useWindowWidth from '../../hooks/useWindowWidth';

import {
  Controls,
  ControlPanelWrapper,
  Display,
  Manage,
  ManageButton,
  Sort,
  Welcome,
  Wrapper,
} from './styles/StyledControlPanel';

import Form from '../Form/Form';

const ControlPanel = () => {
  const [runFadeOutDisplaySelectAnimation, setRunFadeOutDisplaySelectAnimation] = useState(null);
  const [runFadeOutSortSelectAnimation, setRunFadeOutSortSelectAnimation] = useState(null);
  const [selectedOption, setSelectedOption] = useState();
  const [showDisplaySelect, setShowDisplaySelect] = useState(false);
  const [showSortSelect, setShowSortSelect] = useState(false);

  const controlPanel = useRef(null);

  const dispatch = useDispatch();
  const headerHeight = useSelector((state) => state.layout.headerHeight);

  const windowWidth = useWindowWidth();

  useLayoutEffect(() => {
    dispatch(setControlPanelHeight(controlPanel.current.getBoundingClientRect().height));
  }, [dispatch, showDisplaySelect, showSortSelect, windowWidth]);

  const handleSelectOption = (e) => {
    setSelectedOption(e.currentTarget.getAttribute('data-option'));
  };

  const handleUnselectOption = () => {
    setTimeout(() => {
      setSelectedOption(null);
    }, 500);
  };

  const handleToggleShowSortSelect = () => {
    if (!showSortSelect) {
      setShowSortSelect(true);
      setRunFadeOutSortSelectAnimation(false);
    } else {
      setRunFadeOutSortSelectAnimation(true);
      setTimeout(() => {
        setShowSortSelect(false);
      }, 200);
    }
  };

  const handleToggleShowDisplaySelect = () => {
    if (!showDisplaySelect) {
      setShowDisplaySelect(true);
      setRunFadeOutDisplaySelectAnimation(false);
    } else {
      setRunFadeOutDisplaySelectAnimation(true);
      setTimeout(() => {
        setShowDisplaySelect(false);
      }, 200);
    }
  };

  return (
    <>
      <Wrapper headerHeight={headerHeight} ref={controlPanel} showSortSelect={showSortSelect}>
        <ControlPanelWrapper>
          <Welcome>
            <h2>Witaj, Alan!</h2>
            <span></span>
          </Welcome>
          <Controls>
            <button data-option='addTask' title={'Dodaj zadanie'} onClick={handleSelectOption}>
              <FontAwesomeIcon icon={faPlusCircle} />
              {windowWidth > 660 && <p>Dodaj zadanie</p>}
            </button>
            <button data-option='removeTask' title={'Usuń zadanie'}>
              <FontAwesomeIcon icon={faMinusCircle} />
              {windowWidth > 660 && <p>Usuń zadanie</p>}
            </button>
            <button data-option='editTask' title={'Edytuj zadanie'}>
              <FontAwesomeIcon icon={faEdit} />
              {windowWidth > 660 && <p>Edytuj zadanie</p>}
            </button>
            <button
              data-option='clearTasksList'
              title={'Wyczyść listę'}
              onClick={handleSelectOption}>
              <FontAwesomeIcon icon={faTrashAlt} />
              {windowWidth > 660 && <p>Wyczyść listę</p>}
            </button>
          </Controls>
        </ControlPanelWrapper>
        <Manage showDisplaySelect={showDisplaySelect} showSortSelect={showSortSelect}>
          <ManageButton
            runFadeOutSortSelectAnimation={runFadeOutSortSelectAnimation}
            sortSelectButton={true}
            onClick={handleToggleShowSortSelect}>
            Sortuj zadania według:
            <span>
              <FontAwesomeIcon icon={faAngleDoubleDown} />
            </span>
          </ManageButton>
          <Sort
            defaultValue='oldest'
            name='sort'
            runFadeOutSortSelectAnimation={runFadeOutSortSelectAnimation}
            showSortSelect={showSortSelect}>
            <option value='own'>Własna kolejność</option>
            <option value='oldest'>Daty dodania (od najstarszych)</option>
            <option value='newest'>Daty dodania (od najnowszych)</option>
            <option value='A-Z'>Alfabetycznie (A-Z)</option>
            <option value='Z-A'>Alfabetycznie (Z-A)</option>
            <option value='highestPriority'>Priorytetu (od najważniejszego)</option>
            <option value='lowestPriority'>Priorytetu (od najmniej ważnego)</option>
          </Sort>
          <ManageButton
            displaySelectButton={true}
            runFadeOutDisplaySelectAnimation={runFadeOutDisplaySelectAnimation}
            onClick={handleToggleShowDisplaySelect}>
            Wyświetlaj zadania:
            <span>
              <FontAwesomeIcon icon={faAngleDoubleDown} />
            </span>
          </ManageButton>
          <Display
            defaultValue='all'
            name='display'
            runFadeOutDisplaySelectAnimation={runFadeOutDisplaySelectAnimation}
            showDisplaySelect={showDisplaySelect}>
            <option value='all'>Wszystkie</option>
            <option value='all'>Zrobione</option>
            <option value='all'>Niezrobione</option>
          </Display>
        </Manage>
      </Wrapper>
      {selectedOption === 'addTask' && (
        <Form isModalOpenOnInit={true} taskForm={true} disableForm={handleUnselectOption} />
      )}
      {selectedOption === 'clearTasksList' && (
        <Form
          isModalOpenOnInit={true}
          clearTasksListForm={true}
          disableForm={handleUnselectOption}
        />
      )}
    </>
  );
};

export default ControlPanel;
