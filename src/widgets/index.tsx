import { declareIndexPlugin, ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';

async function onActivate(plugin: ReactRNPlugin) {
  // Register settings
  /*await plugin.settings.registerStringSetting({
    id: 'name',
    title: 'What is your Name?',
    defaultValue: 'Bob',
  });

  await plugin.settings.registerBooleanSetting({
    id: 'pizza',
    title: 'Do you like pizza?',
    defaultValue: true,
  });

  await plugin.settings.registerNumberSetting({
    id: 'favorite-number',
    title: 'What is your favorite number?',
    defaultValue: 42,
  });*/

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
      await plugin.app.toast("I'm a 1!");
    },
  });
  await plugin.app.registerCommand({
    id: `ressonance30`,
    name: `Set Ressonance to 30`,
    keyboardShortcut: `opt+2`,
    action: async () => {
      await plugin.app.toast("I'm a 2!");
    },
  });
  await plugin.app.registerCommand({
    id: `ressonance50`,
    name: `Set Ressonance to 50`,
    keyboardShortcut: `opt+3`,
    action: async () => {
      await plugin.app.toast("I'm a 3!");
    },
  });
  await plugin.app.registerCommand({
    id: `ressonance70`,
    name: `Set Ressonance to 70`,
    keyboardShortcut: `opt+4`,
    action: async () => {
      await plugin.app.toast("I'm a 4!");
    },
  });
  await plugin.app.registerCommand({
    id: `ressonance90`,
    name: `Set Ressonance to 90`,
    keyboardShortcut: `opt+5`,
    action: async () => {
      await plugin.app.toast("I'm a 5!");
    },
  });
  await plugin.app.registerCommand({
    id: `ressonance100`,
    name: `Set Ressonance to 100`,
    keyboardShortcut: `opt+0`,
    action: async () => {
      await plugin.app.toast("I'm a 0!");
    },
  });

  // Register a sidebar widget.
  await plugin.app.registerWidget('ae-tag', WidgetLocation.RightSideOfEditor, {
    dimensions: { height: 'auto', width: '100%' },
    powerupFilter: "naextOneTag",
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
          //hidden: true
        },
      ],
    },
  );
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
