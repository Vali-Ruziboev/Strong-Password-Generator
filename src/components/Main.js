const Main = () => {
    return ( 
        <div>
            <nav>

            </nav>
            <main>
                <form>
                    <fieldset>
                        <legend>Uppercase letters</legend>
                        <input type="range" max='100'/>
                    </fieldset>
                    <fieldset>
                        <legend>Lowercase letters</legend>
                        <input type="range" max='100'/>
                    </fieldset>
                    <fieldset>
                        <legend>Digits</legend>
                        <input type="range" max='100'/>
                    </fieldset>
                    <fieldset>
                        <legend>Symbols</legend>
                        <input type="range" max='100'/>
                    </fieldset>
                    <div className="checkboxes">
                        <label><input type="checkbox" name="length"/>
                        Random Length</label>
                        <label><input type="checkbox" />Random Charactors</label>
                    </div>
                    <div className="result">
                        <label htmlFor="result">Password</label>
                        <input type="input" max='100'/>
                    </div>
                    <button>Generate</button>
                </form>

            </main>
        </div>
    );
}

export default Main;