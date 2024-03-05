const DataPost = async (apiLink, data) => {
    const res = await fetch(`http://localhost:3000/${apiLink}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
    });
    return await res.json();
}

export default DataPost;
