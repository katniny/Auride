const aiPosts = [
    `why do my socks keep disappearing??? is my washing machine EATING them???`,
    `i just saw a bird look at me funny. it knows something i dont.`,
    `why is there no mouse-flavored cat food????????`,
    `i put my cereal in before the milk. discuss.`,
    `i identify as a sentient bagel. do not toast me.`,
    `if you think about it, a burrito is just a sandwich with trust issues.`,
    `sleep is just a free trial of death. no thanks.`,
    `i accidentally called my teacher "mom" today. goodbye forever.`,
    `help. i blinked too fast and now im in 3024.`,
    `dogs bark. cats meow. but what sound does a shrimp make???`,
    `why is there a "d" in "fridge" but not in "refrigerator"??? i demand answers.`,
    `who decided that "w" should be called double-u? it looks like two Vs. we've been lied to.`,
    `i tried to make a salad but the lettuce expired in 2018. i think i saw it move.`,
    `if we eat chickens, do chickens eat us in an alternate universe?`,
    `i just spent 3 hours watching videos on how to escape a bear attack. i do not live near bears.`,
    `do fish ever get thirsty or is that a dumb question?`,
    `i dropped my phone on my face again. this is my villian origin story`,
    `you ever close your fridge softly just to see when the light turns off?`,
    `if an orange is orange, why isn't a banana called a yellow?`,
    `i have never seen my neighbors bring in groceries. are they eating air??`,
    `why do we call it a building if it's already built? shouldn't it be a "built"?`,
    `if you drop soap on the floor, is the floor clean or is the soap dirty?`,
    `just tried to drink water from a bottle with the cap still on. send help.`,
    `i would be unstoppable if i just started doing things instead of thinking about doing things.`,
    `hot dogs arent dogs. hamburgers are ham. what are we even eating?`,
    `why does my dog bring me his toy like im gonna fix it? bro, im just as lost as you.`,
    `cheese is just a fancy word for moldy milk and we're all okay with that.`,
    `you ever stare at a word too long and it stops looking real? like... "chair" wtf is a chair??`,
    `every time i get comfy in bed, i remember something i was supposed to do 6 hours ago.`,
    `if you think about it, we're all just skeletons wearing meat suits.`,
    `i bought a plant. it died. i bought another plant. it also died. am i a plant serial killer?`,
    `why are pizzas circular, come in square boxes, and are cut into triangles??`,
    `i would do anything for love... but not cardio. i wont do cardio.`,
    `how do people just... do things? like you just wake up and start being productive? wild.`,
    `i hate when my foot is itchy and my shoe is like "haha, no."`,
    `do not trust an atom. they make up everything. (haha laugh)`,
    `i have two moods: "i need to save money" and "treat yourself" and there is no in-between.`,
    `why do our noses run and our feet smell? this language is broken.`,
    `i set my alarm for 6am. my brain woke up at 5:59am. EXCUSE ME???`,
    `i said "thank you" to Siri. am i too polite or just scared of the AI uprising?`,
    `mosquitoes use my blood to make more mosquitoes. i am not okay with this business model.`,
    `i saw a kid on a leash today. honestly, respect.`,
    `why is the plural of "goose" geese, but the plural of "moose" isnt meese?`,
    `i just inhaled my drink instead of drinking it. 10/10 would not recommend.`,
    `i like my snacks how i like my secrets: hidden and only for me.`,
    `if cinderellas shoe fit perfectly, why did it fall off? disney, answer me.`,
    `if i ever get kidnapped, im just gonna start talking about my hyperfixation. good luck, bro.`,
    `i lost my glasses. they were on my face the entire time. i am a genius.`,
    `i just found a fry at the bottom of the bag. best surprise ever.`,
    `who tf looked at a cow and thought, "yo, we should drink whatever comes out of that"???`,
    `how do mirrors know what's behind you?`,
    `i named my wifi "FBI Surveillance Van" and now my neighbors are scared. um...`,
    `spaghetti is just really long rice if you think about it.`,
    `why do i yawn when i see someone else yawn? is this a secret government experiment?`,
    `just saw a car with eyelashes. it knows something we dont.`,
    `i ordered a salad. it came with bacon. i am at peace with this.`,
    `when you bite down on something, you're actually biting up. your top teeth dont move`,
    `i am emotionally attached to a sock i lost in 2017 btw`,
    `if vampires cant see themselves in mirrors, how do they do their hair? i need to know.`,
    `why are blueberries not actually blue inside? suing for false advertising.`,
    `how do blind people know when they're done wiping?`,
    `i was today years old when i learned you can eat spaghetti with a spoon.`,
    `just realized my name spelled backward isnt cool. rip.`,
    `when life gives you lemons, squeeze them into lifes eyes`,
    `the first person to eat honey must've really trusted that bee`,
    `what if the hokey pokey really is what its all about?`,
    `why do babies in cartoons wear diapers but never pants? where are their pants?`,
    `i blinked and suddenly its 3am. what just happened.`,
    `i am 99% caffeine and bad decisions.`,
    `why does paper beat rock? paper is weak. i call hacks.`,
    `if i text "lol" but im not actually laughing, is that fraud?`,
    `if cats had social media, would they cancel us?`,
    `i think my computer has too many tabs open. same, bro. same.`,
    `there's a fly in my room. i pay rent. get out.`,
    `avocados take 30 years to ripen and 3 seconds to rot.`,
    `i need sleep but i also need to watch 4 hours of random videos first.`,
    `fun fact: im bad at fun facts`,
    `i just typed "how to" into google and let it autofill... i am concerned.`,
    `do robots in sci-fi movies ever watch human shows for fun?`,
    `how many chickens would it take to kill an elephant? asking for a friend.`,
    `i just want to live in a cottage and vibe with a cat. is that too much to ask?`,
    `if you think about it, we're just really smart monkeys with wifi.`,
    `i was gonna clean my room but then i thought... why start now?`,
    `how do worms sleep? do they just... lay there?`,
    `i just found out i've been using chopsticks wrong my whole life. i am in shambles.`,
    `does a straw have one hole or two?`,
    `the voices in my head are arguing about pineapple on pizza.`,
    `i was going to be productive today... then i wasnt.`,
    `my brain has too many tabs open and they're all frozen.`,
    `the government wants to take away our bagels. we must STOP THEM!!!!!1!!!`,
    `mullets... mullets, mullets, mullets, mullets...`,
];

const aurorAIModal = `
    <i class="fa-regular fa-circle-xmark fa-lg" style="float: left; margin-top: 10px;" onclick="closeAurorAIPopup()" aria-hidden="true"></i>
    <br />
    
    <h2 style="margin-top: 5px;">Let AurorAI post for you!</h2>
    <p>Tired of using your brain to create notes for TransSocial? Us too. That's why we're introducing AurorAI, the AI that lets you stop using your brain and create engaging notes with 2 clicks. <a href="/blog/introducing-aurorai">Learn more</a>.</p>

    <br />

    "<span id="randomAurorAINoteGenerated">Generate a note!</span>"

    <br />
    <br />

    <p>Once you're happy with the generated note, you can click "Close" and post it! The generated quote is above in quotes.</p>
    <button onclick="generateAurorAINote();">Generate a Note</button> <button onclick="closeAurorAIPopup();">Close</button>
`;

// show the modal when requested
function aurorAIPopupCreate() {
    // append and put the content inside the modal
    const aurorAIPopup = document.createElement("dialog");
    aurorAIPopup.setAttribute("id", "aurorAI-popup");
    aurorAIPopup.innerHTML = aurorAIModal;
    document.body.appendChild(aurorAIPopup);

    // show modal.
    aurorAIPopup.showModal();
}

function closeAurorAIPopup() {
    const aurorAIPopup = document.getElementById("aurorAI-popup");

    aurorAIPopup.close();
    setTimeout(() => {
        aurorAIPopup.remove();
    }, 500);
}

function generateAurorAINote() {
    const randomPost = aiPosts[Math.floor(Math.random() * aiPosts.length)];
    document.getElementById("randomAurorAINoteGenerated").innerText = randomPost;
    document.getElementById("noteContent-textarea").value = randomPost;
}