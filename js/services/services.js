const postData = async (url , data)=> {
    const res = await fetch(url , {
        method:'POST',
        headers:{
            "Content-type" : "application/json"
        },
        body: data
    });
    return await res.json();
};


const getResource = async (url , data)=> {
    let res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Fetch не сработал по адресу ${url} , состояние : ${res.status}`)
    }
    return await res.json();
};

export {postData};
export {getResource};