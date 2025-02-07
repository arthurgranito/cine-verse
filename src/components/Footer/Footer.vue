<template>
    <footer>
        <p>&copy; {{ new Date().getFullYear() }} Arthur Granito - Todos os direitos reservados.</p>
    </footer>
</template>

<style scoped>
footer{
    padding: 10px;
    display: flex;
    align-items: center;
    width: 100vw;
    justify-content: center;
}
footer p{
    color: #d4d4d8;
    text-align: center;
}
</style>