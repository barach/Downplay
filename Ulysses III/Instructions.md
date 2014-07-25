# Downplay with Ulysses III

## Writing
Since Ulysses is at its core a text editor, you don't need anything to start using Downplay with Ulysses, except of course a licensed copy of Ulysses (which is highly recommended) and a brilliant idea for a play. Just write away to your muse's content and use Downplay markup, and without a doubt your play will light up stages worldwide.

## Exporting
Previewing and exporting your Downplay document in Ulysses requires a bit of setup. While Ulysses doesn't support Downplay natively, it does provides a way to customize your markup and then use a style template to both preview and export your text as a Downplay formatted play. Here are the steps you'll want to take:

### Getting Downplay Markup
Ulysses doesn't support the actual Downplay markup, so we're going to cheat by reassigning headers. There are two ways to get the Downplay markup template into your copy of Ulysses.
1. Download the [sample file](https://github.com/barach/Downplay/blob/master/Ulysses%20III/Sample%20with%20Markup.ulysses.zip), unzip it and open it with Ulysses and viola, there you have it.
2. Go the manual route of opening Preferences > Markup and reassigning headers 1-6 as seen here:
![Downplay markup screenshot setup in Ulysses](https://github.com/barach/Downplay/blob/master/Ulysses%20III/Markup_setup.png)

### Downplay Style
Now that we've assigned the Downplay syntax to the headers, you'll need a Ulysses style template that's designed to use the headers as if they were actual Downplay markup.
1. [Download the template](https://github.com/barach/Downplay/blob/master/Ulysses%20III/Downplay.ulstyle
2. Open Ulysses Preferences > Styles and select **Add Styles...**
3. Browse to where you saved the template in step 1.

Now that you have the markup and the style, you'll want to make sure that each document that you write has the Downplay markup selected and that you export using the Downplay style. Magic!

**NOTE:** This is not an actual implemetation of the Downplay markup in Ulysses, rather it's more of a hack to make it work. The hack part is the usage of headers in place of actual markup processing to make the export look right when using the built in Ulysses preview and export functions and the Downplay style template. That said, if you save your play as plain text and open it in a markup (or markdown) editor that natively supports Downplay, it will work. As of this writing no editors support Downplay, so this is your best usage for now.
