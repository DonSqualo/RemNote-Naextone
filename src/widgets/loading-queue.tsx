import { usePlugin, renderWidget, Queue, useRunAsync, WidgetLocation, useSessionStorageState, Card } from '@remnote/plugin-sdk';
import { calculateRandomNumber } from './run-queue';

export const QueueWidget = () => {
  const plugin = usePlugin();
  /*const flashCard = useRunAsync(async () => await plugin.search.search(["Flashcard UI"]), []);
  if (!flashCard) {
    const flashcardUI = useRunAsync(async () => await plugin.rem.createRem(), []);
    flashcardUI?.setText(['Flashcard UI']);
  }*/
  const [cards, setCards] = useSessionStorageState<string[]>('focusedCards', []);
  console.log("3800", cards);
  if (cards.length == 0) {
    return <div></div>
  }
  else {
    return <Queue width={"100%"} cardIds={cards}></Queue>;
  }
};

renderWidget(QueueWidget);
