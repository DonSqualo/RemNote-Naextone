import { Rem, RNPlugin, usePlugin, useTracker } from '@remnote/plugin-sdk';
import { weightingCode } from './consts';

async function getGlobalSettings(plugin: RNPlugin): Promise<number> {
    const weight =
      (await plugin.settings.getSetting<number>(weightingCode)) || 2;
    return weight;
  }

export const calculateRandomNumber = async (plugin: RNPlugin) => {
    //const tenArray = Array.from(Array(10).keys());
    //const plugin = usePlugin();
    //console.log("3900", weightingCode);
    const weighting = await getGlobalSettings(plugin);
    //console.log("3900", weighting);
    //await plugin.app.toast("Hi" + weighting?.toString() || 'None');
    return;
} 