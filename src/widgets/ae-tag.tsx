import { usePlugin, renderWidget, useTracker, useRunAsync, WidgetLocation } from '@remnote/plugin-sdk';

export const NaextOneTag = () => {
  const plugin = usePlugin();
  const ctx = useRunAsync(() => plugin.widget.getWidgetContext<WidgetLocation.RightSideOfEditor>(), [])
  const rem = useRunAsync(() =>plugin.rem.findOne(ctx?.remId), [ctx?.remId]);
  console.log(rem);
  const ressonance = useRunAsync(() => rem?.getPowerupProperty('naextOneTag', 'ressonance'), [rem]);
  return <div>Hi, æ is: {ressonance}</div>
};

renderWidget(NaextOneTag);
