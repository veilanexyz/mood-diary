import React from 'react';
import { createAssistant, createSmartappDebugger } from '@salutejs/client';
import './Styles/App.scss';
import {
  BrowserRouter as Router,
  Route,
  Routes /*useNavigate*/,
} from 'react-router-dom';
import Page1 from './pages/page1';
import Page2 from './pages/page2';
import Page3 from './pages/page3';
import DonePage from './pages/done_page';
import Homepage from './pages/homepage';

const initializeAssistant = (getState /*: any*/, getRecoveryState) => {
  if (process.env.NODE_ENV === 'development') {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? '',
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
      // getRecoveryState: getState,
      nativePanel: {
        defaultText: 'ччччччч',
        screenshotMode: false,
        tabIndex: -1,
      },
    });
  } else {
    return createAssistant({ getState });
  }
};

class AppWithAssist extends React.Component {
  // navigate = useNavigate();
  constructor(props) {
    super(props);
    console.log('constructor');

    this.state = {
      //notes: [{ id: Math.random().toString(36).substring(7), title: 'тест' }],
      page: 0,
      period: null,
      description: null,
      factors: null,
    };

    this.assistant = initializeAssistant(() => this.getStateForAssistant());

    this.assistant.on('data', (event /*: any*/) => {
      console.log(`assistant.on(data)`, event);
      if (event.type === 'character') {
        console.log(`assistant.on(data): character: "${event?.character?.id}"`);
      } else if (event.type === 'insets') {
        console.log(`assistant.on(data): insets`);
      } else {
        const { action } = event;
        this.dispatchAssistantAction(action);
      }
    });

    this.assistant.on('start', (event) => {
      let initialData = this.assistant.getInitialData();

      console.log(`assistant.on(start)`, event, initialData);
    });

    this.assistant.on('command', (event) => {
      console.log(`assistant.on(command)`, event);
    });

    this.assistant.on('error', (event) => {
      console.log(`assistant.on(error)`, event);
    });

    this.assistant.on('tts', (event) => {
      console.log(`assistant.on(tts)`, event);
    });
  }

  getStateForAssistant() {
    console.log('getStateForAssistant: this.state:', this.state);
    const state = {
      item_selector: {
        period: this.state.period,
        feelingDescription: this.state.description,
        influenceFactors: this.state.factors,

        /*ignored_words: [
          'добавить',
          'установить',
          'запиши',
          'поставь',
          'закинь',
          'напомнить', // addNote.sc
          'удалить',
          'удали', // deleteNote.sc
          'выполни',
          'выполнил',
          'сделал', // выполнил|сделал
        ], */
      },
    };
    console.log('getStateForAssistant: state:', state);
    return state;
  }

  dispatchAssistantAction(action) {
    console.log('dispatchAssistantAction', action);
    if (action) {
      switch (action.type) {
        case 'save_mood_period':
          return this.save_mood_period(action);

        case 'save_feeling_description':
          return this.save_feeling_description(action);

        case 'save_influence_factors':
          return this.save_influence_factors(action);

        default:
          throw new Error();
      }
    }
  }

  save_mood_period(action) {
    console.log('save_mood_period', action);
    this.setState({ page: 1, period: action.period });
    // window.location.href = '/page2';
    // });
  }

  save_feeling_description(action) {
    console.log('save_feeling_description', action);
    this.setState({ page: 2, feelingDescription: action.description });
    // window.location.href = '/page3';
    // });
  }

  save_influence_factors(action) {
    console.log('save_influence_factors', action);
    this.setState({ page: 3, influenceFactors: action.factors });
    //window.location.href = '/done_page';
    //});
  }
  1;

  render() {
    console.log('render');
    switch (this.state.page) {
      case 0:
        return <Homepage onChangePage={(page) => this.setState({ page })} />;
      case 1:
        return <Page1 onChangePage={(page) => this.setState({ page })} />;
      case 2:
        return <Page2 onChangePage={(page) => this.setState({ page })} />;
      case 3:
        return <Page3 onChangePage={(page) => this.setState({ page })} />;
      case 4:
        return <DonePage onChangePage={(page) => this.setState({ page })} />;
      default:
        return <div>{'Неправильный номер страницы: ' + this.state.page}</div>;
    }
  }
  //   console.log('render');
  //   return (
  //     <Router>
  //       <Routes>
  //       <Route path="/" element={<Homepage />} />

  //         <Route path="/page1" element={<Page1 />} />
  //         <Route path="/page2" element={<Page2 />} />
  //         <Route path="/page3" element={<Page3 />} />
  //         <Route path="/done_page" element={<DonePage />} />
  //       </Routes>
  //     </Router>
  //   );
  // }
}

export default AppWithAssist;