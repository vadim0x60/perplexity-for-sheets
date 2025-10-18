function Perplexity(api_key, task) {
  payload = JSON.stringify(task)

  code = 429
  wait = Math.random() * 1000
  while (code == 429) {
    Utilities.sleep(wait)
    response = UrlFetchApp.fetch("https://api.perplexity.ai/chat/completions", {
      method: "POST",
      contentType: "application/json",
      headers: { "Authorization": "Bearer " + api_key },
      payload: payload,
      muteHttpExceptions: true
    });
    code = response.getResponseCode();
    wait *= 2
  }
  if (code >= 400) throw Error(response)
  json = JSON.parse(response.getContentText());
  return JSON.parse(json.choices[0].message.content)
}

function unwrap(arr) {
  levels = []
  unwrapped = []

  for (elem of arr) {
    level = 0
    while (Array.isArray(elem)) {
      elem = elem[0]
      level = level + 1
    }
    unwrapped.push(elem)
    levels.push(level)
  }

  return [unwrapped, levels]
}

function wrap(arr, levels) {
  return arr.map(function(e, i) {
    level = levels[i]
    while (level > 0) {
      e = [e]
      level = level - 1
    }
    return e
  })
}

/**
 * Researches a topic and fills the blanks
 * @customfunction
 */
function RESEARCH(api_key, system, user, blanks) {
  if (!Array.isArray(blanks)) return RESEARCH(api_key, system, user, [blanks])[0]
  if (blanks.length == 1 && Array.isArray(blanks[0]) && blanks[0].length > 1) return [RESEARCH(api_key, system, user, blanks[0])]
  let [blanks_flat, levels] = unwrap(blanks)

  schema = {
    'type': 'object',
    'properties': Object.fromEntries(blanks_flat.map(b => [b, {'type': 'string'}])),
    'required': blanks_flat
  }

  completion = Perplexity(api_key, {
    'model': 'sonar-pro',
    'messages': [
      {
        role: 'system',
        content: system
      },
      {
        role: 'user',
        content: user
      }
    ],
    'response_format': {
      'type': 'json_schema',
      'json_schema': {'schema': schema}
    }
  })

  return wrap(blanks_flat.map(b => completion[b]), levels)
}
