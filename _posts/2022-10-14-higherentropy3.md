---
layout: bpost
title:  "Seeking Higher Entropy: Conversations [3/3]"
subtitle: "Don't let robots replace you."
permalink: /blog/highentropy3
date:   2022-10-24 23:41:20 -0400
katex: true
category: blog
---

We revisit the following claim. 

**Claim 1.** The happiness yield for an activity decreases if it has low entropy. 

“Happiness” is quite vague. We can better understand the “happiness yield” of an activity as the tendency for people to do that activity willingly[^1].

**Corollary 1.** The extent that people tend to engage with an activity is proportional to its entropy. 

I think this corollary is probably a better phrasing of Claim 1 in general, because, as my friend **itisnoted** noted (pun intended): activities like exercising are inherently low entropy but have consistently high happiness yield. However, the main use for Corollary 1 here is to discuss conversations. 

## I’m not a robot
We borrow some ideas from [computability theory](https://en.wikipedia.org/wiki/Computability_theory). 

The concept of the *computability* of some function is that one could write a computer program that can evaluate the function. At this point, the most appropriate example of an uncomputable function would be Kolmogorov complexity. 

**Conjecture 1.** Human behavior is uncomputable. 

A slightly weaker statement but which is more intuitive:

**Claim 2.** The inputs to the human behavior function are unobtainable anyways. 

What this essentially means is that we can’t know everything that’s going on in a person’s mind because we simply don’t know what they’ve experienced. In other words, empathy can’t perfectly tell you how a person feels or what they think. Perhaps empathy is the way human behavior becomes *computably approximable*: putting yourself in someone else's shoes won’t reveal what shit they’ve stepped in or the buses they’ve had to chase, but at least it might give you a good sense of what they’re going through.

Back to Conjecture 1. 

This uncertainty — or unpredictability — of people is what makes other people[^3] so interesting. It would be an understatement to say that most of people aren’t independent enough to live without the influence of other humans

I’m getting dangerously close to falling down some rabbit holes I don’t want to go into, so let’s just move along. But first, VeggieTales and randomness.

<iframe width="560" height="315" src="https://www.youtube.com/embed/j4Ph02gzqmY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## SelfCAPTCHA

The fact that we can’t program human behavior (and code up an approximation, for now) motivates me to be more than a computer program.

Why? Well, let's look at a snippet of pseudocode from the 2020 Nacho texting emulator:

    function lol(context){
        if (context.humor > 5) {
            send(‘lmao’)
            }
        else if (context.humor >= 0) {
            send(‘lol’)
        } else {
            send(‘o’)
        }
    }

Seriously, how does “o” contribute to any conversation at all? Answer: it doesn’t, in almost all cases. These low entropy responses really don’t have any meaning to them. In fact, Corollary 1 says that people tend to give little attention to these messages. 

And while "lol" actually means something, I use it halfheartedly too often for it to really have any genuine meaning, besides maybe mild amusement. And while texting norms are different from English[^3], that doesn't change the fact that it's a form of communication. 

> "Why do books have words? Because they are about stuff."
>  - Linus Hamilton, Information Theory class at MCSP 2022

I think only 60% of my texts[^4] are about stuff. The rest are general muffled indications of my emotions ("cool", "oops", "?", ":D") or lack therof ("meh", "lol", "hm"). 

There isn't anything wrong with general muffled indications of emotions. Where conversations using mouth and ears can use inflection and tone, text has to do something different. 

What concerns me is that autosuggest can give me verbatim what I would type in many cases. I am, in a sense, becoming computably approximable, which is the concerning part. Am I really worth texting if a computer program could effectively replace me?

And it's not just via text messages, but also in conversations. Whenever my mom asks "how was school?" or my friends ask "what's up?" I find myself giving the same responses ("okay", "nothing much"), even if my day was different than normal. 

My attempt at solving this has been SelfCAPTCHAing. Just like CAPTCHAs on websites that ask you to confirm that you aren't a robot, I reflect on things I say to determine if they were intentional or instinct.

The results have been surprising. I've (mostly) killed my instinct to say "Hi \_\_\_\_" whenever someone says "I'm \_\_\_\_," which was a huge step for me. The [dadjoke](https://na-cho.github.io/blog/2021/12/28/dadjokenim.html) isn't bad, but because I've used and heard it so many times that it's become inconsequential. 

Recall that entropy basically measures the expectability of something. Lower entropy means that something will behave predictably. Conversations where I let my autopilot guide me result in predictable conversation. When I abandon my instincts and instead attempt to convey my intrinsically high entropy thoughts, my words are more purposeful and less predictable for others — and myself. 

**Proposition 1.** High entropy conversations are engaging and meaningful. 

## Conclusion
There's a lot more I could say, but something something diminishing returns tells me that I'm already past the point at which the entropy of these three blog posts decreases with every sentence I write. I leave thinking more about what could be said on entropy and life as an exercise to the reader. 

I guess if I were to summarize: high entropy things are more interesting, and humans think high entropy thoughts. High entropy conversations foster meaningful relationships with others, and having more entropy in daily life makes each day significant and worthwhile. 

I am on a quest for higher entropy, because I know that if I leave things the way they are, the decades will begin to feel like years and the days like seconds. I want to have conversations that aren't robotic but robust, and have deep relationships with the people around me. 

I've been stuck in this while loop for too long. It's time for me to `break` out, and start living rather than compiling. 

  

[^1]: This assumes that people engage in activities that make them happy. Unfortunately, this axiom is not part of all axiomatic systems. 

[^2]: In fact, it makes *you* interesting too. College applications have made me realize that my head is a much more interesting place than I thought it was. But that’s a post for another day.

[^3]: There’s this [great video by Tom Scott]([https://www.youtube.com/watch?v=fS4X1JfX6_Q](https://www.youtube.com/watch?v=fS4X1JfX6_Q)) which talks about internet speech norms.

[^4]: This is without interactions with bots or text games, as otherwise this would be much, much lower.
