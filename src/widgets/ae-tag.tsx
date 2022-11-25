import { usePlugin, renderWidget, useTracker, useRunAsync, WidgetLocation } from '@remnote/plugin-sdk';

export const NaextOneTag = () => {
  const plugin = usePlugin();
  const ctx = useRunAsync(() => plugin.widget.getWidgetContext<WidgetLocation.RightSideOfEditor>(), [])
  const rem = useTracker((reactivePlugin) => reactivePlugin.rem.findOne(ctx?.remId), [ctx?.remId]);
  const ressonance = useRunAsync(() => rem?.getPowerupProperty('naextOneTag', 'ressonance'), [rem]);
  const res = parseInt(ressonance || '0');
  if ( res >= 1 &&  res <= 10){
    return <div><div className="naext-tag-wrapper n-color-10"><span>{ressonance}</span></div></div>
  }
  else if ( res >= 11 &&  res <= 30){
    return <div><div className="naext-tag-wrapper n-color-30"><span>{ressonance}</span></div></div>
  }
  else if ( res >= 31 &&  res <= 50){
    return <div><div className="naext-tag-wrapper n-color-50"><span>{ressonance}</span></div></div>
  }
  else if ( res >= 51 &&  res <= 70){
    return <div><div className="naext-tag-wrapper n-color-70"><span>{ressonance}</span></div></div>
  }
  else if ( res >= 71 &&  res <= 90){
    return <div><div className="naext-tag-wrapper n-color-90"><span>{ressonance}</span></div></div>
  }
  else if ( res >= 91 &&  res <= 99){
    return <div><div className="naext-tag-wrapper n-color-99"><span>{ressonance}</span></div></div>
  }
  else if ( res == 100){
    return <div><div className="naext-tag-wrapper n-color-100"><span>{ressonance}</span></div></div>
  }
  else {
    return <div><div className="naext-tag-wrapper n-color-0"><span>{ressonance}</span></div></div>
  }
};

renderWidget(NaextOneTag);
