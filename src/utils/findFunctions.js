

export function getSingleUserByName(members, args){
    const member = members.filter((item) => item[1].user.username.toLowerCase() === args.toLowerCase())
    if(member.length === 0) return null
    return member[0][1]
}

export function getSingleChannelByName(channels, name){
    const channel = channels.filter((item) => item[1].name.toLowerCase() === name.toLowerCase())
    if(channel.length === 0) return null
    return channel[0][1]
}

export function getMultipleUsersByName(members, args){
    const memberarray = args.map(arg => members.filter((item) => item[1].user.username.toLowerCase() === arg.toLowerCase()))
    if(memberarray.length === 0) return null
    return memberarray
}

