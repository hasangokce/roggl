const redirectUri = 'http://localhost:4001'

const Roggl = {
  async saveBoard (input) {
    return await fetch(`${redirectUri}/boards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    }
    ).then(response => response.json()
    ).then(jsonResponse => {
      console.log(jsonResponse);
      return jsonResponse.insertedId
    })
  },

  getBoards (user_id) {
    console.log(`${redirectUri}/boards/${user_id}`);
    return fetch(`${redirectUri}/boards/${user_id}`, {
      headers: {

      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      
      if (!jsonResponse) {
        return [];
      }
      return jsonResponse
      //   return jsonResponse.tracks.items.map(track => ({
      //     id: track.id,
      //     name: track.name,
      //     artist: track.artists[0].name,
      //     album: track.album.name,
      //     uri: track.uri
      //   }));
    });
  },

  getColumns (_id) {
    return fetch(`${redirectUri}/boards/columns/${_id}`).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse[0]) {
        return [];
      }
      return jsonResponse
    });
  },

  update (input) {
    console.log('update')
    console.log(input)
    fetch(`${redirectUri}/boards`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
      },
      body: JSON.stringify(input)
    }
    )
  },

  delete (input) {
    console.log('Roggl.delete')
    console.log(input)
    fetch(`${redirectUri}/boards/${input}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }
    )
  },

  columnUpdate (input) {
    console.log('column update')
    fetch(`${redirectUri}/boards/columns`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json' // Indicates the content 
      },
      body: JSON.stringify(input)
    }
    )
  },

  columnUpdateTitle (input) {
    console.log('column update')
    fetch(`${redirectUri}/boards/columns/edit/title`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json' // Indicates the content 
      },
      body: JSON.stringify(input)
    }
    )
  },
  async addNewPage (input) {
    return await fetch(`${redirectUri}/boards/columns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    }
    ).then(response => response.json()
    ).then(jsonResponse => {
      console.log(jsonResponse);
      return jsonResponse.insertedId
    })
  },

  pageDelete (input) {
    console.log('Roggl.delete')
    console.log(input)
    fetch(`${redirectUri}/boards/columns/${input}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }
    )
  },

  async lookCredentials (input) {
    console.log('|--> Roggl.js called');
    return await fetch(`${redirectUri}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    }
    ).then(response => response.json()
    ).then(jsonResponse => {
      if (jsonResponse.ok === 0) {
        return jsonResponse
      } else {
        return jsonResponse._id
      }
    })
  },

  async userRegister (input) {
    console.log('|--> Roggl.js called for registration');
    return await fetch(`${redirectUri}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    }
    ).then(response => response.json()
    ).then(jsonResponse => {
      if (jsonResponse.ok === 1) {
        console.log(jsonResponse);
        return jsonResponse.insertedId
      } else {
        return { 'ok': 0}
      }
    })
  }
}

export default Roggl