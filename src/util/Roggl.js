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
 
  getBoards () {
    return fetch(`${redirectUri}/boards`, {
      headers: {

      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse[0].name) {
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

}

export default Roggl