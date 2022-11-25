import { usePlugin, renderWidget, useTracker, useRunAsync, WidgetLocation } from '@remnote/plugin-sdk';

export const NaextOneButton = () => {
  const plugin = usePlugin();
  // here would be the code that makes you click on a button and then show a random rem
  return <div>This will show your Queue and Calendar eventually</div> //
};

renderWidget(NaextOneButton);
