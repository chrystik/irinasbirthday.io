const messages = document.querySelector('.chat-messages');
const quickReplies = document.querySelector('.quick-replies');

function addMessage(text, type = 'received') {
  const message = document.createElement('div');
  message.className = `message ${type}`;
  message.textContent = text;

  messages.append(message);
  scrollToBottom();

  return message;
}

function scrollToBottom() {
  messages.scrollTo({
    top: messages.scrollHeight,
    behavior: 'smooth'
  });
}

function addSystemMessage(
  text = 'Тицяй варіант. Можеш тіко один 👀'
) {
  removeSystemMessage();

  const message = document.createElement('div');
  message.className = 'system-message';
  message.textContent = text;

  messages.append(message);
  scrollToBottom();

  return message;
}

function removeSystemMessage() {
  const systemMessage = messages.querySelector('.system-message');

  if (systemMessage) {
    systemMessage.remove();
  }
}

function disableOtherButtons(activeBtn) {
  const buttons = document.querySelectorAll('.reply-btn');

  buttons.forEach(btn => {
    if (btn !== activeBtn) {
      btn.disabled = true;
      btn.classList.add('disabled');
    } else {
      btn.disabled = true;
    }
  });
}

function hideQuickReplies(delay = 1800) {
  if (!quickReplies) return;

  setTimeout(() => {
    quickReplies.classList.add('is-hiding');

    setTimeout(() => {
      quickReplies.remove();
    }, 400);
  }, delay);
}

document.addEventListener('click', e => {
  const btn = e.target.closest('.reply-btn');
  if (!btn) return;

  // не чіпаємо кнопки другого сценарію
  if (btn.classList.contains('extra-btn')) {
    return;
  }

  removeSystemMessage();

  const action = btn.dataset.action;

  disableOtherButtons(btn);
  hideQuickReplies();

  switch (action) {
    case 'hello':
      handleHello(btn);
      break;

    case 'how':
      handlePaka(btn);
      break;

    case 'custom':
      handleCustom();
      break;
  }
});

function askAboutDay(
  intro = 'пишу тобі, бо не можу згадати який то сьогодні деньочок? 🤔'
) {
  setTimeout(() => {
    addMessage(intro);
  }, 700);

  setTimeout(() => {
    addSystemMessage();

    const wrapper = document.createElement('div');
    wrapper.className = 'quick-replies extra-options';

    wrapper.innerHTML = `
      <button class="reply-btn day-btn">
        День Незалежності Омерики
      </button>

      <button class="reply-btn day-btn">
        День Народження Тетріса
      </button>

      <button class="reply-btn day-btn">
        Міжнародний день Нельсона Мандели (ООН)
      </button>
    `;

    messages.append(wrapper);
    scrollToBottom();

    wrapper.addEventListener('click', e => {
      const btn = e.target.closest('.day-btn');
      if (!btn) return;

      removeSystemMessage();

      wrapper.querySelectorAll('.day-btn').forEach(item => {
        if (item !== btn) {
          item.disabled = true;
          item.classList.add('disabled');
        } else {
          item.disabled = true;
        }
      });

      const text = btn.textContent.trim();

      setTimeout(() => {
        wrapper.classList.add('is-hiding');

        setTimeout(() => {
          wrapper.remove();
          addMessage(text, 'sent');

          handleDayAnswer(text);
        }, 400);
      }, 1800);
    });
  }, 1400);
}

function handleHello(btn) {
  addMessage(btn.textContent.trim(), 'sent');

  setTimeout(() => {
    const img = document.createElement('img');

    img.src = 'img/hello.png';
    img.className = 'peek-photo';

    messages.append(img);
    scrollToBottom();
  }, 600);

  setTimeout(() => {
    addMessage('я так і знала що ти це обереш 😏');
  }, 1100);

  setTimeout(() => {
    askAboutDay();
  }, 2600);
}

function handlePaka(btn) {
  addMessage(btn.textContent.trim(), 'sent');

  setTimeout(() => {
    addMessage('здрастє, приїхали!');
  }, 700);

  setTimeout(() => {
    showPakaOptions();
  }, 2200); // чекаємо поки зникнуть перші кнопки
}

function showPakaOptions() {
  addSystemMessage();

  const wrapper = document.createElement('div');
  wrapper.className = 'quick-replies extra-options';

  wrapper.innerHTML = `
    <button class="reply-btn extra-btn">
      та ладно, жартую
    </button>

    <button class="reply-btn extra-btn">
      чисто клацнула, шоб глянуть шо буде
    </button>

    <button class="reply-btn extra-btn">
      рішила бути непередбачуваною
    </button>
  `;

  messages.append(wrapper);
  scrollToBottom();

  wrapper.addEventListener('click', e => {
    const btn = e.target.closest('.extra-btn');
    if (!btn) return;

    removeSystemMessage();

    wrapper.querySelectorAll('.extra-btn').forEach(item => {
      if (item !== btn) {
        item.disabled = true;
        item.classList.add('disabled');
      } else {
        item.disabled = true;
      }
    });

    const text = btn.textContent.trim();

    setTimeout(() => {
      wrapper.classList.add('is-hiding');

      setTimeout(() => {
        wrapper.remove();

        addMessage(text, 'sent');

        askAboutDay(
            'ну лааадно, дапустім... пишу тобі, бо не можу згадати який то сьогодні деньочок? 🤔'
        );
      }, 400);
    }, 1800);
  });
}

function showCreativeOptions() {
  addSystemMessage();

  const wrapper = document.createElement('div');
  wrapper.className = 'quick-replies extra-options';

  wrapper.innerHTML = `
    <button class="reply-btn creative-btn">
      хіхі
    </button>

    <button class="reply-btn creative-btn">
      рішила поіздівацця
    </button>

    <button class="reply-btn creative-btn">
      а чо нє? я в тебе вірю
    </button>
  `;

  messages.append(wrapper);
  scrollToBottom();

  wrapper.addEventListener('click', e => {
    const btn = e.target.closest('.creative-btn');
    if (!btn) return;

    removeSystemMessage();

    wrapper.querySelectorAll('.creative-btn').forEach(item => {
      if (item !== btn) {
        item.disabled = true;
        item.classList.add('disabled');
      } else {
        item.disabled = true;
      }
    });

    const text = btn.textContent.trim();

    setTimeout(() => {
      wrapper.classList.add('is-hiding');

      setTimeout(() => {
        wrapper.remove();

        addMessage(text, 'sent');

        if (text === 'хіхі') {
          askAboutDay(
            'ну лааадно, дапустім... пишу тобі, бо не можу згадати який то сьогодні деньочок? 🤔'
          );
        }

        if (text === 'рішила поіздівацця') {
          askAboutDay(
            'ти ля на неї... а я взагалі-то пишу тобі, бо не можу згадати який то сьогодні деньочок? 🤔'
          );
        }

        if (text === 'а чо нє? я в тебе вірю') {
            setTimeout(() => {
                addMessage(
                'любофф це, коли в тебе вірять більше ніж ти сам 🥲'
                );
            }, 700);

            setTimeout(() => {
                const gif = document.createElement('img');

                gif.src = 'img/spongebob-rainbow.gif';
                gif.className = 'chat-gif';

                messages.append(gif);
                scrollToBottom();
            }, 1500);

            setTimeout(() => {
                showSingleOption(
                'дямс, отака вот любофь',
                () => {
                    setTimeout(() => {
                    const img = document.createElement('img');

                    img.src = 'img/love-reaction.png';
                    img.className = 'sent-photo';

                    messages.append(img);
                    scrollToBottom();
                    }, 700);

                    setTimeout(() => {
                    showSingleOption(
                        'то шо ти хтіла?',
                        () => {
                        setTimeout(() => {
                            addMessage(
                            'маю нагальне запитання....'
                            );
                        }, 700);

                        setTimeout(() => {
                            askAboutDay();
                        }, 1800);
                        }
                    );
                    }, 1500);
                }
                );
            }, 3000);
        }
      }, 400);
    }, 1800);
  });
}

function handleCustom() {
  const wrapper = document.createElement('div');
  wrapper.className = 'input-row';

  wrapper.innerHTML = `
    <input
      type="text"
      placeholder="Написати повідомлення..."
      maxlength="300"
    />
    <button>➤</button>
  `;

  messages.append(wrapper);
  scrollToBottom();

  const input = wrapper.querySelector('input');
  const send = wrapper.querySelector('button');

  input.focus();

  function submit() {
    const value = input.value.trim();

    if (!value) return;

    wrapper.remove();

    addMessage(value, 'sent');

    setTimeout(() => {
      addMessage(
        'я канєшно знала, що ти баришня творча, але йопсіль-мопсіль, ти шо, думала, я аж на стіко передбачу твої слова????'
      );
    }, 800);

    setTimeout(() => {
        showCreativeOptions();
    }, 2400);
  }

  send.addEventListener('click', submit);

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      submit();
    }
  });
}

function showSingleOption(text, callback) {
  addSystemMessage('Тицяй 👀');

  const wrapper = document.createElement('div');
  wrapper.className = 'quick-replies extra-options';

  wrapper.innerHTML = `
    <button class="reply-btn single-btn">
      ${text}
    </button>
  `;

  messages.append(wrapper);
  scrollToBottom();

  wrapper.querySelector('button').addEventListener('click', () => {
    removeSystemMessage();

    wrapper.classList.add('is-hiding');

    setTimeout(() => {
      wrapper.remove();

      addMessage(text, 'sent');

      callback?.();
    }, 400);
  });
}

function handleDayAnswer(answer) {
  if (answer === 'День Незалежності Омерики') {
    setTimeout(() => {
      const img = document.createElement('img');

      img.src = 'img/trump.png';
      img.className = 'chat-gif';

      messages.append(img);
      scrollToBottom();
    }, 800);

    setTimeout(() => {
    addMessage(
        'отакої.... а ще омериканка називається... вже пройшоооов'
    );
    }, 1200);

    setTimeout(() => {
    addMessage(
        'вже в тій омериці і про себе любіму забула'
    );
    }, 2200);

    setTimeout(() => {
    showWhatYouWantFlow();
    }, 3400);

    return;
  }

  if (answer === 'Міжнародний день Нельсона Мандели (ООН)') {
    setTimeout(() => {
      const img = document.createElement('img');

      img.src = 'img/nelson.png';
      img.className = 'chat-gif';

      messages.append(img);
      scrollToBottom();
    }, 800);

    setTimeout(() => {
    addSystemMessage('Тицяй 👀');
        showSingleOption(
            'привітати друзяку Нельсона',
            () => {
            setTimeout(() => {
                addMessage(
                'а себе ти привітать не хочеш?!'
                );
            }, 500);

            setTimeout(() => {
                showWhatYouWantFlow('а з чим?');
            }, 1800);
            }
        );
    }, 1800);

    return;
  }

    if (answer === 'День Народження Тетріса') {
      setTimeout(() => {
        showSingleOption(
          'пограться',
          () => {
            setTimeout(() => {
              addMessage(
                'капєц, стільки років стукнуло, а їй би тікі грацця'
              );
            }, 500);
    
            setTimeout(() => {
              showWhatYouWantFlow();
            }, 1800);
          }
        );
      }, 500);
    
      return;
    }
}

function showWhatYouWantFlow(
  firstButtonText = 'та шо ти хочеш?'
) {
  setTimeout(() => {
    const img = document.createElement('img');

    img.src = 'img/what.png';
    img.className = 'sent-photo';

    messages.append(img);
    scrollToBottom();
  }, 1000);

  setTimeout(() => {
    showSingleOption(
      firstButtonText,
      () => {
        setTimeout(() => {
          const img = document.createElement('img');

          img.src = 'img/janyk.jpg';
          img.className = 'chat-gif';

          messages.append(img);
          scrollToBottom();
        }, 800);

        setTimeout(() => {
          showSingleOption(
            'Напам\'ятати',
            () => {
              openBirthdayCard();
            }
          );
        }, 1800);
      }
    );
  }, 2200);
}

async function openBirthdayCard() {
  const card =
    document.querySelector(
      '.birthday-card'
    );

  const content =
    document.querySelector(
      '.birthday-card-content'
    );

  content.innerHTML = '';
  card.classList.remove('hidden');

  await showScene(
    'нас хотіли розділити',
    'img/split.png'
  );

  await showScene(
    'але ми не розділялись 😎',
    'img/kuku.png'
  );

  await showScene(
    'Ти - мій лучік, що освітлює, а не сліпить.',
    'img/sun.png'
  );

  await showScene(
    'Ти - мій побєдітєль, що побідить усіх.',
    'img/yay.png'
  );

  await showScene(
    'Ти - мощь, ти крємєнь, ти скала!',
    'img/skala.png'
  );

  content.innerHTML = `
    <div class="birthday-finale">
      <img
        src="img/hb.png"
        class="final-image"
      >

      <h1 class="birthday-title">
        Хеппі Бьорздей! 🎉
      </h1>
    </div>
  `;

  startConfetti();
}

async function showScene(
  text,
  image = null
) {
  const content =
    document.querySelector(
      '.birthday-card-content'
    );

  const scene =
    document.createElement('div');

  scene.className =
    'birthday-scene';

  content.innerHTML = '';
  content.append(scene);

  const line =
    document.createElement('div');

  line.className =
    'birthday-line';

  scene.append(line);

  await typeWords(text, line);

  if (image) {
    await new Promise(r =>
      setTimeout(r, 700)
    );

    const img =
      document.createElement('img');

    img.src = image;
    img.className = 'boom-image';

    scene.append(img);

    await new Promise(r =>
      setTimeout(r, 2500)
    );
  } else {
    await new Promise(r =>
      setTimeout(r, 1800)
    );
  }
}

async function addCardPhrase(
  text,
  image = null
) {
  const content = document.querySelector(
    '.birthday-card-content'
  );

  const block = document.createElement('div');
  block.className = 'birthday-block';

  const line = document.createElement('div');
  line.className = 'birthday-line';

  block.append(line);
  content.append(block);

  await typeWords(text, line);

  if (image) {
    const img = document.createElement('img');

    img.src = image;
    img.className = 'boom-image';

    block.append(img);

    await new Promise(resolve =>
      setTimeout(resolve, 2200)
    );
  } else {
    await new Promise(resolve =>
      setTimeout(resolve, 1000)
    );
  }
}

// стартова підказка
addSystemMessage();

function startConfetti() {
  const duration = 5000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });

    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

function typeWords(text, container) {
  return new Promise(resolve => {
    const words = text.split(' ');
    let i = 0;

    const interval = setInterval(() => {
      if (i >= words.length) {
        clearInterval(interval);
        resolve();
        return;
      }

      container.innerHTML +=
        (i ? ' ' : '') +
        `<span class="word">${words[i]}</span>`;

      i++;
    }, 350);
  });
}

function showBoomImage(src) {
  return new Promise(resolve => {
    const img = document.createElement('img');

    img.src = src;
    img.className = 'boom-image';

    document
      .querySelector('.birthday-card-content')
      .append(img);

    setTimeout(resolve, 1800);
  });
}
