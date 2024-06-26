function UpperBar() {
    return (
        <div>
            <div>
                {PageName}
            </div>
            <div>
                <SearchBar />
            </div>
            <div>
                {BellIcon}
            </div>
            <div>
                <ProfileSection />
            </div>
        </div>
    )
}