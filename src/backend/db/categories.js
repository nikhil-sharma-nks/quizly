import { v4 as uuid } from 'uuid';

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    id: '1',
    categoryName: 'Science: Computers',
    description: 'Collection of all videos',
  },
  {
    id: '2',
    categoryName: 'General Knowledge',
    description:
      'Spirituality is a broad concept with room for many perspectives. In general, it includes a sense of connection to something bigger than ourselves, and it typically involves a search for meaning in life',
  },
  {
    id: '3',
    categoryName: 'Entertainment: Music',
    description:
      'Meditation is a practice in which an individual uses a technique – such as mindfulness, or focusing the mind on a particular object, thought, or activity – to train attention and awareness, and achieve a mentally clear and emotionally calm and stable state.',
  },
  {
    id: '4',
    categoryName: 'Geography',
    description:
      'Depression (major depressive disorder) is a common and serious medical illness that negatively affects how you feel, the way you think and how you act. ',
  },
  {
    id: '5',
    categoryName: 'Sports',
    description:
      'Anxiety is a feeling of fear, dread, and uneasiness. It might cause you to sweat, feel restless and tense, and have a rapid heartbeat. It can be a normal reaction to stress.',
  },
  {
    id: uuid(),
    categoryName: 'better-self',
    description:
      'This genre is an umbrella term which would include all the things that would help us to be a better verion of ourself',
  },
];
