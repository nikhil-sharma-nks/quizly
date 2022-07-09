/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */
import COMPUTER_1 from '../../assets/1.svg';
import GENERAL_KNOWLEDGE_2 from '../../assets/2.svg';
import MUSIC_3 from '../../assets/3.svg';
import GEOGRAPHY_4 from '../../assets/4.svg';
import SPORTS_5 from '../../assets/5.svg';

export const categories = [
  {
    id: '1',
    categoryName: 'Science: Computers',
    description:
      'This is for all the teck geeks out there! Show off your knowledge',
    img: COMPUTER_1,
  },
  {
    id: '2',
    categoryName: 'General Knowledge',
    description:
      'Take this General Knowledge Quiz to know whether you know the basics of this world',
    img: GENERAL_KNOWLEDGE_2,
  },
  {
    id: '3',
    categoryName: 'Entertainment: Music',
    description: 'Are you really a music fanatic? Come test yourself',
    img: MUSIC_3,
  },
  {
    id: '4',
    categoryName: 'Geography',
    description:
      'Does World, Countries, Monuments facinate you? If yes, then you have come to right place ',
    img: GEOGRAPHY_4,
  },
  {
    id: '5',
    categoryName: 'Sports',
    description: `If you loved sports period in school, this one's for you`,
    img: SPORTS_5,
  },
];
