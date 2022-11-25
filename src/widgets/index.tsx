import { declareIndexPlugin, filterAsync, ReactRNPlugin, Rem, usePlugin, useTracker, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';
import { calculateRandomNumber } from './run-queue';

async function onActivate(plugin: ReactRNPlugin) {
  await plugin.settings.registerNumberSetting({
    id: 'Random weighting',
    title: 'Factor to weigh different ressonances. If set to two, then a 90 is twice as likely to show up as a 80',
    defaultValue: 2,
  });

  await plugin.app.registerPowerup(
    'Naext', // human-readable name
    'naextOneTag', // powerup code used to uniquely identify the powerup
    'A custom tag that allows you to tell how important something is to you', // description
    {
      slots: [
        {
          // slot code used to uniquely identify the powerup slot
          code: 'ressonance',
          // human readable slot code name
          name: 'Ressonance',
          hidden: true
        },
      ],
    },
  );
  
  // initializes a Flashcard UI Rem
  const flashCard = await plugin.search.search(["Flashcard UI"]);
  if (!flashCard) {
    const flashcardUI = await plugin.rem.createRem();
    flashcardUI?.setText(['Flashcard UI']);
  }
  
  const openPage = async (rem: Rem) => {
    const hasCards = await rem.getCards();
    
    if (hasCards.length > 0) {
      //const parent = await rem.getParentRem();
      const flashCard = await plugin.search.search(["Flashcard UI"]);
      flashCard[0].openRemAsPage();
      showRemQueue(rem);
    }
    else {
      rem.openRemAsPage();
      showRemQueue(rem);
    }
    return;
  }
  let lastRem: (Rem | undefined) = undefined;

  const runNaextQueue = async () => {
    const allNaexts = await plugin.powerup.getPowerupByCode(
      'naextOneTag',
    );
    const rand = await plugin.settings.getSetting<number>('Random weighting');
    const allNaextRems = (await allNaexts?.taggedRem()) || [];
    let allRemsWithNaext = await filterAsync(allNaextRems, async x => (await x.getPowerupProperty('naextOneTag', 'ressonance')) != null)
    allRemsWithNaext = allRemsWithNaext.filter(x => x._id != lastRem?._id);
    const randomNumber = Math.floor(Math.random() * allRemsWithNaext.length);
    calculateRandomNumber(plugin);
    openPage(allRemsWithNaext[randomNumber]);
    lastRem = allRemsWithNaext[randomNumber];
    //allRemsWithNaext[randomNumber].openRemAsPage();
  }
  const showRemQueue = async (rem: Rem) => {
    //const focusedRem = await plugin.focus.getFocusedRem();
    //if (!focusedRem) return;
    const focusedCards = await rem.getCards();
    plugin.storage.setSession('focusedCards', focusedCards.map((focusedCards) => focusedCards._id));
    //focusedRem.setPowerupProperty('naextOneTag', 'ressonance', ['50']);
    //console.log("3800", focusedCards);
    //await plugin.app.toast("focusedCards: " + (await focusedCards).length);
  }
  // A command that inserts text into the editor if focused.
  await plugin.app.registerCommand({
    id: 'editor-command',
    name: 'Editor Command',
    action: async () => {
      plugin.editor.insertPlainText('Hello World!');
    },
  });

  // Show a toast notification to the user.
  await plugin.app.registerCommand({
    id: `ressonance10`,
    name: `Set Ressonance to 10`,
    keyboardShortcut: `opt+1`,
    action: async () => {
      const focusedRem = await plugin.focus.getFocusedRem();
      if (!focusedRem) return;
      focusedRem.setPowerupProperty('naextOneTag', 'ressonance', ['10']);
    },
  });
  await plugin.app.registerCommand({
    id: `ressonance30`,
    name: `Set Ressonance to 30`,
    keyboardShortcut: `opt+2`,
    action: async () => {
      const focusedRem = await plugin.focus.getFocusedRem();
      if (!focusedRem) return;
      focusedRem.setPowerupProperty('naextOneTag', 'ressonance', ['30']);
    },
  });
  await plugin.app.registerCommand({
    id: `ressonance50`,
    name: `Set Ressonance to 50`,
    keyboardShortcut: `opt+3`,
    action: async () => {
      const focusedRem = await plugin.focus.getFocusedRem();
      if (!focusedRem) return;
      focusedRem.setPowerupProperty('naextOneTag', 'ressonance', ['50']);
    },
  });
  await plugin.app.registerCommand({
    id: `ressonance70`,
    name: `Set Ressonance to 70`,
    keyboardShortcut: `opt+4`,
    action: async () => {
      const focusedRem = await plugin.focus.getFocusedRem();
      if (!focusedRem) return;
      focusedRem.setPowerupProperty('naextOneTag', 'ressonance', ['70']);
    },
  });
  await plugin.app.registerCommand({
    id: `ressonance90`,
    name: `Set Ressonance to 90`,
    keyboardShortcut: `opt+5`,
    action: async () => {
      const focusedRem = await plugin.focus.getFocusedRem();
      if (!focusedRem) return;
      focusedRem.setPowerupProperty('naextOneTag', 'ressonance', ['90']);
    },
  });
  await plugin.app.registerCommand({
    id: `ressonance100`,
    name: `Set Ressonance to 100`,
    keyboardShortcut: `opt+0`,
    action: async () => {
      const focusedRem = await plugin.focus.getFocusedRem();
      if (!focusedRem) return;
      focusedRem.setPowerupProperty('naextOneTag', 'ressonance', ['100']);
    },
  });
  await plugin.app.registerCommand({
    id: `runNaextQueue`,
    name: `Shows the naext one!`,
    keyboardShortcut: `opt+q`,
    action: async () => {
      //await plugin.app.toast("Let's go!");
      runNaextQueue();
    },
  });

  // Register a sidebar widget.
  await plugin.app.registerWidget('ae-tag', WidgetLocation.RightSideOfEditor, {
    dimensions: { height: 'auto', width: '70px' },
    powerupFilter: "naextOneTag",
  });
  await plugin.app.registerWidget('loading-queue', WidgetLocation.DocumentBelowTitle, {
    dimensions: { height: 'auto', width: '100%' },
    //powerupFilter: "naextOneTag",
  });
  await plugin.app.registerWidget('sidebar-naext-queue', WidgetLocation.LeftSidebar, {
    dimensions: { height: 'auto', width: '100%' },
    widgetTabIcon: `${plugin.rootURL}Naext-icon.svg`,//'https://res.cloudinary.com/deepwave-org/image/upload/v1669276373/Heye.earth/Asset_10_4x_oaw93u.png',
  });
  await plugin.app.registerSidebarButton({
    id: 'naext-queue',
    name: 'Start Naext Queue',
    icon: `${plugin.rootURL}naext-icon.png`,
    action: async () => {
      runNaextQueue();
    },
    description: 'Start Naext Queue',
  })

}


async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
