import { usePlugin, renderWidget, useTracker, useRunAsync, WidgetLocation } from '@remnote/plugin-sdk';

export const NaextOneTag = () => {
  const plugin = usePlugin();
  const ctx = useRunAsync(() => plugin.widget.getWidgetContext<WidgetLocation.RightSideOfEditor>(), [])
  const rem = useRunAsync(() =>plugin.rem.findOne(ctx?.remId), [ctx?.remId]);
  //console.log(rem);
  //const ressonance = useRunAsync(() => rem?.getPowerupPropertyAsRichText('naextOneTag', 'ressonance'), [rem]);
  return <div>Hi, ae is: </div> //{ressonance}
};

renderWidget(NaextOneTag);
