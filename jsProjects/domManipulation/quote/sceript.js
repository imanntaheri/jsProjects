let btn = document.querySelector('#new-quote');
let person = document.querySelector('.person');
let quote = document.querySelector('.quote')


const quotes =[ {
    quote: `"Success is not final, failure is not fatal: It is the courage to continue that counts."`,
    person:`Winston Churchill`
}, {
    quote: `"If you can dream it, you can do it."`,
    person:`Wlat Disney`
}, {
    quote: `"If you want something done, ask a busy person to do it."`,
    person: `Laura Ingalls Wilder`
}, {
    quote: `"If your actions inspire others to dream more, learn more, do more and become more, you are a leader."`,
    person: `John Quincy Adams`
}, {
    quote: `"Your time is limited, don't waste it living someone else's life."`,
    person: `Steve Jobs`
}, {
    quote: `"The best way to find out what you want in life is to try a lot of things."`,
    person: `Oprah Winfrey`
}, {
    quote: `"Life is what we make it and how we make it – whether we realize it or not."`,
    person: `Napoleon Hill`
}, {
    quote: `"People often say that motivation doesn't last. Well, neither does bathing. That's why we recommend it daily."`,
    person: `Zig Ziglar`
}, {
    quote: `"The only limit to our realization of tomorrow will be our doubts of today."`,
    person: `Franklin D. Roosevelt`
}, {
    quote: `"Be persistent and never give up hope."`,
    person: `George Lucas`
}, ];

btn.addEventListener('click',function(){
    let random = Math.floor(Math.random() * quotes.length);

    quote.innerText = quotes[random].quote;
    person.innerText = quotes[random].person;

});

btn.addEventListener('rotate', 'click')